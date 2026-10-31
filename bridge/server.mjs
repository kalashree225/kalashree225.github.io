import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { execFile } from "node:child_process";
import { URL } from "node:url";

const root = resolve(".");
const port = Number(process.env.SKILL_ATLAS_PORT || 4174);
const token = process.env.SKILL_ATLAS_TOKEN || randomBytes(18).toString("hex");
const cataloguePath = join(root, "data", "catalogue.json");

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "http://127.0.0.1:4173" });
  response.end(JSON.stringify(body));
}

function readCatalogue() {
  return JSON.parse(readFileSync(cataloguePath, "utf8"));
}

function body(request) {
  return new Promise((resolveBody, reject) => {
    let value = "";
    request.on("data", (chunk) => { value += chunk; if (value.length > 100_000) reject(new Error("request too large")); });
    request.on("end", () => { try { resolveBody(value ? JSON.parse(value) : {}); } catch { reject(new Error("invalid JSON")); } });
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  try {
    if (request.method === "OPTIONS") {
      response.writeHead(204, { "access-control-allow-origin": "http://127.0.0.1:4173", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,x-bridge-token,x-confirm" });
      return response.end();
    }
    if (url.pathname === "/health" && request.method === "GET") {
      const catalogue = readCatalogue();
      return json(response, 200, { ok: true, version: "0.1.0", token, roots: catalogue.roots });
    }
    if (url.pathname === "/catalogue" && request.method === "GET") return json(response, 200, readCatalogue());
    if (url.pathname === "/rescan" && request.method === "POST") {
      if (request.headers["x-bridge-token"] !== token) return json(response, 401, { error: "bridge token required" });
      await new Promise((resolveRun, rejectRun) => execFile(process.execPath, ["scripts/sync.mjs"], { cwd: root }, (error, stdout, stderr) => error ? rejectRun(new Error(stderr || error.message)) : resolveRun(stdout)));
      return json(response, 200, { ok: true, catalogue: readCatalogue() });
    }
    if (url.pathname === "/install" && request.method === "POST") {
      const input = await body(request);
      const catalogue = readCatalogue();
      const stacks = JSON.parse(readFileSync(join(root, "data", "stacks.json"), "utf8"));
      const stack = stacks.find((item) => item.id === input.stackId);
      if (!stack) return json(response, 400, { error: "unknown stack" });
      const mode = input.mode === "apply" ? "apply" : "dry-run";
      const actions = stack.skillIds.map((skillId) => {
        const skill = catalogue.skills.find((item) => item.id === skillId);
        return { skillId, source: skill?.installs?.[0]?.path || null, targetAgent: input.agent || "claude-code", action: "link-if-missing" };
      });
      if (mode === "apply") return json(response, 409, { error: "apply requires the native install manager; use the dry-run plan first", actions });
      return json(response, 200, { mode, stack, actions, warnings: ["No files changed. Apply is intentionally gated in this bridge."] });
    }
    const sourceMatch = url.pathname.match(/^\/skills\/([a-z0-9-]+)\/source$/);
    if (sourceMatch && request.method === "GET") {
      const skill = readCatalogue().skills.find((item) => item.id === sourceMatch[1]);
      if (!skill?.installs?.[0]?.path) return json(response, 404, { error: "skill not found" });
      const path = join(skill.installs[0].path, skill.id, "SKILL.md");
      if (!existsSync(path)) return json(response, 404, { error: "source unavailable" });
      response.writeHead(200, { "content-type": "text/plain; charset=utf-8", "access-control-allow-origin": "http://127.0.0.1:4173" });
      return response.end(readFileSync(path, "utf8"));
    }
    json(response, 404, { error: "not found" });
  } catch (error) {
    json(response, 500, { error: error.message });
  }
});

server.listen(port, "127.0.0.1", () => console.log(`Skill Atlas bridge listening on http://127.0.0.1:${port}`));
