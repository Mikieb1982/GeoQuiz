const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const SUBDIR = path.join(OUT_DIR, 'GeoQuiz');

if (!fs.existsSync(OUT_DIR)) {
  console.error(`Export directory not found: ${OUT_DIR}`);
  process.exit(1);
}

// Remove existing subdir if present
if (fs.existsSync(SUBDIR)) {
  fs.rmSync(SUBDIR, { recursive: true, force: true });
}
fs.mkdirSync(SUBDIR, { recursive: true });

for (const entry of fs.readdirSync(OUT_DIR)) {
  if (entry === 'GeoQuiz') continue;
  fs.renameSync(path.join(OUT_DIR, entry), path.join(SUBDIR, entry));
}

