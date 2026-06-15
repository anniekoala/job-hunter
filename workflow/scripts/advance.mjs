#!/usr/bin/env node
// Move an application to its next stage. Enforces the allowed state machine.
// Usage:
//   node workflow/scripts/advance.mjs --slug "<slug>" --to building [--note "..."]
//   node workflow/scripts/advance.mjs --slug "<slug>" --status   (just print current state)
//   node workflow/scripts/advance.mjs --list                     (list all applications)

import fs from "node:fs";
import path from "node:path";
import {
  APPLICATIONS_DIR,
  TRANSITIONS,
  readStatus,
  writeStatus,
  parseArgs,
} from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));

const GATE_NOTES = {
  "materials-ready->applied":
    "REMINDER: submit on the official site yourself. No agent applies for you.",
  "applied->interview-invited":
    "Only set this when the employer actually invited you to interview.",
};

function listAll() {
  if (!fs.existsSync(APPLICATIONS_DIR)) {
    console.log("(no applications yet)");
    return;
  }
  const slugs = fs
    .readdirSync(APPLICATIONS_DIR)
    .filter((d) => fs.existsSync(path.join(APPLICATIONS_DIR, d, "status.json")));
  if (slugs.length === 0) {
    console.log("(no applications yet)");
    return;
  }
  console.log("Applications:");
  for (const slug of slugs) {
    const s = readStatus(slug);
    console.log(`  [${s.stage.padEnd(17)}] ${s.company} — ${s.role}  (${slug})`);
  }
}

if (args.list) {
  listAll();
  process.exit(0);
}

if (!args.slug) {
  console.error("ERROR: --slug is required (or use --list).");
  process.exit(1);
}

const status = readStatus(args.slug);
if (!status) {
  console.error(`ERROR: no application found for slug "${args.slug}". Try --list.`);
  process.exit(1);
}

if (args.status || !args.to) {
  const allowed = TRANSITIONS[status.stage] || [];
  console.log(`${status.company} — ${status.role}`);
  console.log(`  stage: ${status.stage}`);
  console.log(`  can advance to: ${allowed.length ? allowed.join(", ") : "(terminal)"}`);
  process.exit(0);
}

const to = args.to;
const allowed = TRANSITIONS[status.stage] || [];
if (!allowed.includes(to)) {
  console.error(`ERROR: cannot go ${status.stage} -> ${to}.`);
  console.error(`Allowed from "${status.stage}": ${allowed.length ? allowed.join(", ") : "(terminal)"}`);
  process.exit(1);
}

const now = new Date().toISOString();
status.stage = to;
status.history.push({ stage: to, at: now, note: args.note || "" });
writeStatus(args.slug, status);

console.log(`${status.company} — ${status.role}: now "${to}".`);
const gate = GATE_NOTES[`${status.history.at(-2)?.stage}->${to}`];
if (gate) console.log(gate);
