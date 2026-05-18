import fs from "node:fs";

const path = process.argv[2];
if (!path || !fs.existsSync(path)) {
  console.error("Usage: node scripts/inspect-log-patterns.mjs <log_file>");
  process.exit(1);
}

const text = fs.readFileSync(path, "utf-8");
const patterns = ["error", "timeout", "failed", "exception"];
const report = {};
for (const p of patterns) {
  report[p] = (text.match(new RegExp(p, "gi")) || []).length;
}
console.log(JSON.stringify(report, null, 2));
