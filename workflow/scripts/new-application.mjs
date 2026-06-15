#!/usr/bin/env node
// Create a new application folder when YOU decide to pursue a role.
// Usage:
//   node workflow/scripts/new-application.mjs --company "TikTok" --role "Creator Reputation Manager" \
//        --link "https://..." --location "LA" --fit 8.5 \
//        --why "Strong T&S + creator ops match" --concerns "Heavy policy drafting"

import fs from "node:fs";
import path from "node:path";
import { appDir, slugify, writeStatus, parseArgs, APPLICATIONS_DIR } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));

if (!args.company || !args.role) {
  console.error("ERROR: --company and --role are required.");
  console.error('Example: node workflow/scripts/new-application.mjs --company "TikTok" --role "Creator Reputation Manager" --link "https://..."');
  process.exit(1);
}

const slug = slugify(args.company, args.role);
const dir = appDir(slug);

if (fs.existsSync(path.join(dir, "status.json"))) {
  console.error(`ERROR: application already exists: ${path.relative(process.cwd(), dir)}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const now = new Date().toISOString();

const job = {
  slug,
  company: args.company,
  role: args.role,
  link: args.link || "",
  location: args.location || "",
  fitScore: args.fit ? Number(args.fit) : null,
  whyItFits: args.why || "",
  concerns: args.concerns || "",
  capturedAt: now,
};
fs.writeFileSync(path.join(dir, "job.json"), JSON.stringify(job, null, 2) + "\n");

writeStatus(slug, {
  slug,
  company: args.company,
  role: args.role,
  link: args.link || "",
  stage: "selected",
  createdAt: now,
  history: [{ stage: "selected", at: now, note: "You decided to pursue this role." }],
});

const rel = (p) => path.relative(path.resolve(APPLICATIONS_DIR, "..", ".."), p);
console.log(`Created application: ${slug}`);
console.log(`  folder: ${rel(dir)}`);
console.log(`  stage:  selected`);
console.log("");
console.log("Next: trigger Agent 2 (Application Builder), then advance:");
console.log(`  node workflow/scripts/advance.mjs --slug "${slug}" --to building`);
