#!/usr/bin/env node
// Render a resume HTML to a full-page PNG for in-editor (Cursor) preview.
// Usage: node workflow/scripts/html-to-png.mjs <input.html> <output.png>
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const input = process.argv[2];
const out = process.argv[3];
if (!input || !out) {
  console.error("Usage: node html-to-png.mjs <input.html> <output.png>");
  process.exit(2);
}
const html = await readFile(input, "utf8");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`Wrote: ${out}`);
