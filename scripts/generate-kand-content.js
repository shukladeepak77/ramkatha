// Reads the raw katha source (../ramcharitmanaskatha/<folder>/chapterN.txt)
// for each kand and writes src/content/data/<slug>.json (chapter title +
// body text only — audio is intentionally skipped for now). Chapter title
// is the first line of each chapterN.txt (see ../split_markdown.py, which
// produced these files from the "## " headings of the original
// *-katha-vistrit.md); the rest of the file is the body.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "ramcharitmanaskatha");
const DATA_DIR = path.join(ROOT, "src", "content", "data");

// slug -> source folder name (folder names are inconsistent casing/spelling)
const KANDS = [
  { slug: "bal-kand", folder: "balkand" },
  { slug: "ayodhya-kand", folder: "Ayodhya" },
  { slug: "aranya-kand", folder: "aranya" },
  { slug: "kishkindha-kand", folder: "kishkindha" },
  { slug: "sundar-kand", folder: "sunderkand" },
  { slug: "lanka-kand", folder: "lankakand" },
  { slug: "uttar-kand", folder: "uttarkand" },
];

fs.mkdirSync(DATA_DIR, { recursive: true });

for (const { slug, folder } of KANDS) {
  const srcDir = path.join(SOURCE_DIR, folder);
  const files = fs.readdirSync(srcDir).filter((f) => /^chapter\d+\.txt$/.test(f));
  files.sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0], 10);
    const nb = parseInt(b.match(/\d+/)[0], 10);
    return na - nb;
  });

  const chapters = files.map((file) => {
    const id = parseInt(file.match(/\d+/)[0], 10);
    const raw = fs.readFileSync(path.join(srcDir, file), "utf8").trim();
    const [firstLine, ...rest] = raw.split("\n");
    const title = firstLine.trim();
    const body = rest.join("\n").trim();

    return { id, title, body };
  });

  fs.writeFileSync(
    path.join(DATA_DIR, `${slug}.json`),
    JSON.stringify({ slug, chapters }, null, 2)
  );
  console.log(`${slug}: ${chapters.length} chapters -> ${slug}.json`);
}
