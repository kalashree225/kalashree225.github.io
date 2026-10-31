import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { sources } from "../config/sources.config.mjs";

const root = resolve(".");
const dataDir = join(root, "data");
const overrides = JSON.parse(readFileSync(join(dataDir, "overrides.json"), "utf8"));
const now = new Date();
const staleMs = 30 * 24 * 60 * 60 * 1000;

const fieldByName = {
  "claude-api": "agents", "cline-sdk": "agents", "mcp-builder": "agents", "skill-creator": "agents",
  "frontend-design": "frontend", "impeccable": "frontend", "web-artifacts-builder": "frontend", "webapp-testing": "frontend",
  "web-design-guidelines": "frontend", "react19-source-patterns": "frontend", "react19-test-patterns": "frontend",
  docx: "documents", "doc-coauthoring": "documents", pdf: "documents", pptx: "documents", latex: "documents",
  "algorithmic-art": "visual", "canvas-design": "visual", "visual-design-studio": "visual", "theme-factory": "visual",
  xlsx: "data", "find-skills": "research", "academy-guide": "research", "context-map": "research", "discernment-nudge": "research",
  "internal-comms": "comms"
};
const familyByField = { agents: "build", frontend: "make", documents: "write", visual: "make", data: "inspect", research: "learn", comms: "write" };
const tierByField = { agents: "strong", frontend: "strong", documents: "light", visual: "light", data: "light", research: "light", comms: "light" };

function expand(p) {
  return p.startsWith("~") ? join(process.env.HOME || process.env.USERPROFILE || "", p.slice(2)) : p;
}

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 16);
}

function parseSkill(path, install) {
  const body = readFileSync(path, "utf8");
  const id = basename(resolve(path, "..")).toLowerCase();
  const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim() || id;
  const summary = body.match(/^(?:>\s*)?(.{35,180})$/m)?.[1]?.trim() || `Use ${id} when this workflow needs focused guidance.`;
  const field = overrides[id]?.field || fieldByName[id] || "research";
  const stat = statSync(path);
  const status = now - stat.mtimeMs > staleMs ? "stale" : "ok";
  let linkType = "dir";
  try {
    const info = lstatSync(resolve(path, ".."));
    if (info.isSymbolicLink()) linkType = process.platform === "win32" ? "junction" : "symlink";
  } catch {}
  return {
    id, name: heading, field, stack: field === "agents" ? "ai" : field === "frontend" ? "frontend" : undefined,
    tier: overrides[id]?.tier || tierByField[field], inferred: [fieldByName[id] ? "field" : "field", "family", "tier"],
    description: overrides[id]?.description || summary, useWhen: `When the task is about ${field}.`, featured: overrides[id]?.featured || "standard",
    inputs: ["task goal", "constraints"], outputs: ["guided result"], tools: [], sideEffects: ["may create or edit files"],
    related: overrides[id]?.related || [], examples: [], preview: { type: "code", src: `previews/${id}.svg` },
    installs: [{ agent: install.agent, path: install.root, linkType, hash: hashFile(path), status }],
    weight: { files: 1, bytes: stat.size }, status, warnings: [], version: "local", lastVerified: now.toISOString()
  };
}

function scanSource(source) {
  const sourceRoot = expand(source.path);
  if (!existsSync(sourceRoot)) return { source, missing: true, skills: [] };
  const skills = [];
  for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const skillFile = join(sourceRoot, entry.name, "SKILL.md");
    if (existsSync(skillFile)) skills.push(parseSkill(skillFile, { agent: source.agent, root: sourceRoot }));
  }
  return { source, missing: false, skills };
}

const scans = sources.filter((source) => source.platform === process.platform || source.platform === "win32" && process.platform === "win32").map(scanSource);
const byId = new Map();
for (const scan of scans) {
  for (const skill of scan.skills) {
    const existing = byId.get(skill.id);
    if (existing) {
      existing.installs.push(...skill.installs);
      existing.status = existing.status === "ok" && skill.status === "ok" ? "ok" : existing.status === "broken" || skill.status === "broken" ? "broken" : "stale";
      existing.weight.files += skill.weight.files;
      existing.weight.bytes += skill.weight.bytes;
    } else byId.set(skill.id, skill);
  }
}
const catalogue = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
const missingRoots = scans.filter((scan) => scan.missing).map((scan) => ({ agent: scan.source.agent, path: expand(scan.source.path) }));
const statusCounts = catalogue.reduce((counts, skill) => { counts[skill.status] = (counts[skill.status] || 0) + 1; return counts; }, {});
const output = { schemaVersion: 1, generatedAt: now.toISOString(), platform: process.platform, skills: catalogue, roots: scans.map((scan) => ({ agent: scan.source.agent, path: expand(scan.source.path), exists: !scan.missing })), statusCounts, warnings: missingRoots.map((root) => `Missing root: ${root.agent} ${root.path}`) };
function comparable(value) {
  return JSON.parse(JSON.stringify(value, (key, item) => key === "generatedAt" || key === "lastVerified" ? null : item));
}
mkdirSync(dataDir, { recursive: true });
const target = join(dataDir, "catalogue.json");
const serialized = JSON.stringify(output, null, 2) + "\n";
if (process.argv.includes("--check")) {
  let current = null;
  try { current = JSON.parse(readFileSync(target, "utf8")); } catch {}
  const expected = JSON.parse(serialized);
  if (!current || JSON.stringify(comparable(current)) !== JSON.stringify(comparable(expected))) {
    console.error("catalogue.json is out of date; run npm run sync");
    process.exitCode = 1;
  } else console.log(`catalogue is current (${catalogue.length} skills)`);
} else {
  writeFileSync(target, serialized);
  writeFileSync(join(dataDir, "history.ndjson"), JSON.stringify({ id: `sync-${Date.now()}`, at: now.toISOString(), durationMs: 0, added: catalogue.map((skill) => skill.id), removed: [], changed: [], errors: missingRoots }) + "\n", { flag: "a" });
  console.log(`synced ${catalogue.length} skills; ${missingRoots.length} roots missing`);
}
