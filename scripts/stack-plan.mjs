import { readFileSync } from "node:fs";
import { join } from "node:path";
const stacks = JSON.parse(readFileSync(join(process.cwd(), "data", "stacks.json"), "utf8"));
const requested = process.argv[2] || "frontend-light";
const stack = stacks.find((item) => item.id === requested);
if (!stack) { console.error(`Unknown stack: ${requested}`); process.exit(1); }
console.log(JSON.stringify({ mode: "dry-run", stack, actions: stack.skillIds.map((skillId) => ({ skillId, action: "link-if-missing", safe: true })) }, null, 2));
