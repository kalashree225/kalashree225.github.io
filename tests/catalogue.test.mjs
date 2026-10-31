import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("generated catalogue has the required trust shape", () => {
  const catalogue = JSON.parse(readFileSync(new URL("../data/catalogue.json", import.meta.url), "utf8"));
  assert.equal(catalogue.schemaVersion, 1);
  assert.ok(catalogue.skills.length > 0);
  assert.ok(catalogue.skills.every((skill) => skill.id && skill.installs?.length));
  assert.ok(catalogue.statusCounts.ok >= 0);
  assert.ok(catalogue.roots.some((root) => root.exists));
});
