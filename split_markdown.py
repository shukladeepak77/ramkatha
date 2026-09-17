"""
Split a markdown file into separate chapterN.txt files, using each
top-level '## ' heading as a chapter boundary. Nested '### ' subsections
stay inside their parent chapter. Strips markdown formatting symbols
(#, *, etc.) since this is going to TTS, not for reading as markdown.

Usage:
    python3 split_markdown.py <input.md> <output_folder>
"""

import sys
import os
import re


def split_md(input_path: str, output_folder: str):
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split on lines that are exactly "## <title>" (not ### or more)
    parts = re.split(r'\n(?=## [^#])', content)

    chapters = []
    for part in parts:
        part = part.strip()
        if part.startswith("## "):
            chapters.append(part)

    if not chapters:
        print("No '## ' section headers found. Check the file structure.")
        return

    os.makedirs(output_folder, exist_ok=True)

    for i, chapter_text in enumerate(chapters, start=1):
        # Remove markdown symbols (#, *, _) since this is for TTS narration
        cleaned = re.sub(r'^#+\s*', '', chapter_text, flags=re.MULTILINE)
        cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', cleaned)
        cleaned = re.sub(r'\*(.*?)\*', r'\1', cleaned)
        cleaned = re.sub(r'^-{3,}\s*$', '', cleaned, flags=re.MULTILINE)
        cleaned = re.sub(r'\n{3,}', '\n\n', cleaned).strip()

        out_path = os.path.join(output_folder, f"chapter{i}.txt")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(cleaned)
        title = chapter_text.split("\n")[0].replace("## ", "")
        print(f"  Saved chapter{i}.txt: {title} ({len(cleaned)} chars)")

    print(f"\nDone! {len(chapters)} chapters saved to {output_folder}/")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 split_markdown.py <input.md> <output_folder>")
        sys.exit(1)
    split_md(sys.argv[1], sys.argv[2])
