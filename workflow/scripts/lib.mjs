import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// repo root = JOB/ (two levels up from workflow/scripts/)
export const REPO_ROOT = path.resolve(__dirname, "..", "..");
export const APPLICATIONS_DIR = path.join(REPO_ROOT, "outputs", "applications");

export const TRANSITIONS = {
  selected: ["building", "archived"],
  building: ["materials-ready", "selected", "archived"],
  "materials-ready": ["applied", "building", "archived"],
  applied: ["interview-invited", "rejected", "archived"],
  "interview-invited": ["interview-prep", "archived"],
  "interview-prep": ["done", "archived"],
  done: [],
  rejected: [],
  archived: [],
};

export function slugify(company, role) {
  const clean = (s) =>
    String(s || "")
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 50);
  return `${clean(company)}_${clean(role)}`.replace(/^_+|_+$/g, "");
}

export function appDir(slug) {
  return path.join(APPLICATIONS_DIR, slug);
}

export function readStatus(slug) {
  const p = path.join(appDir(slug), "status.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function writeStatus(slug, status) {
  const dir = appDir(slug);
  fs.mkdirSync(dir, { recursive: true });
  status.updatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(dir, "status.json"),
    JSON.stringify(status, null, 2) + "\n"
  );
}

export function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}
