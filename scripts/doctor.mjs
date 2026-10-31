import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const cataloguePath = join(root, "data", "catalogue.json");
const checks = [];
function check(name, pass, detail) { checks.push({ name, pass, detail }); }
check("package manifest", existsSync(join(root, "package.json")), "package.json exists");
check("overrides", existsSync(join(root, "data", "overrides.json")), "curated overrides are present");
try { execFileSync(process.execPath, ["scripts/sync.mjs", "--check"], { cwd: root, stdio: "pipe" }); check("catalogue freshness", true, "generated catalogue matches installed roots"); } catch { check("catalogue freshness", false, "run npm run sync"); }
if (existsSync(cataloguePath)) {
  const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));
  check("catalogue schema", Array.isArray(catalogue.skills) && catalogue.schemaVersion === 1, `${catalogue.skills.length} skills`);
  check("read-only safety", !catalogue.skills.some((skill) => skill.status === "broken"), "no broken local skill files");
}
for (const result of checks) console.log(`${result.pass ? "PASS" : "FAIL"} ${result.name}: ${result.detail}`);
if (checks.some((result) => !result.pass)) process.exitCode = 1;
