import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const QUEUE_DIR = path.join(ROOT, "content", "queue");
const BLOG_DIR = path.join(ROOT, "content", "blog");

if (!fs.existsSync(QUEUE_DIR)) process.exit(0);
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

function parisTodayISO() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;
  return `${y}-${m}-${day}`;
}

const today = parisTodayISO();
const files = fs.readdirSync(QUEUE_DIR).filter(f => f.startsWith(today) && f.endsWith(".mdx"));

if (files.length === 0) {
  console.log("No post to publish today:", today);
  process.exit(0);
}

for (const file of files) {
  fs.renameSync(path.join(QUEUE_DIR, file), path.join(BLOG_DIR, file));
  console.log("Published:", file);
}
