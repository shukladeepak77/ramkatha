# Where the content comes from

All 7 Kands are populated in `src/content/data/<slug>.json` (6,139 verse
units total: shlok, chaupai, doha, soratha, chhand — mool text plus the
Hindi meaning for each).

| Slug              | Kand             | PDF pages | Verse units |
| ----------------- | ---------------- | --------- | ----------- |
| `bal-kand`         | बालकाण्ड         | 17–342    | 1938        |
| `ayodhya-kand`     | अयोध्याकाण्ड     | 343–618   | 1646        |
| `aranya-kand`      | अरण्यकाण्ड       | 619–680   | 355         |
| `kishkindha-kand`  | किष्किन्धाकाण्ड  | 681–712   | 195         |
| `sundar-kand`      | सुन्दरकाण्ड      | 713–770   | 335         |
| `lanka-kand`       | लंकाकाण्ड        | 771–904   | 800         |
| `uttar-kand`       | उत्तरकाण्ड       | 905–1056  | 870         |

Source: the Gita Press Gorakhpur "सचित्र, सटीक" edition (टीका by
हनुमानप्रसाद पोद्दार), via [archive.org](https://archive.org/details/ramcharitmanas_202204).
The PDF's own text layer uses a legacy pre-Unicode font and can't be
extracted directly, so this was built from archive.org's own OCR pass
(DjVu XML, page-aligned) instead, parsed into verse/meaning pairs and
cleaned up for common OCR artifacts (stray digits standing in for ऽ,
`|` instead of ।, zero-width-joiner noise, etc).

The mool chaupai/doha (Tulsidas, 16th century) is public domain. The Hindi
word-meanings in this specific edition are Poddar's, technically under
Indian copyright until ~2032 — Gita Press itself distributes this text
freely everywhere and this is a non-commercial devotional site, but worth
knowing if the scope of reuse ever changes.

## Known limitations

OCR isn't perfect. What to expect:

- Occasional wrong matra or misread character in a word (e.g. a name or
  conjunct rendered slightly off). The verse *text* is generally accurate;
  proofread against the original if something looks wrong — `ramcharitmanas.pdf`
  in the repo root has the same page numbering used in the table above
  (open it directly to the PDF page number, no offset), or use the "search
  inside" box at https://archive.org/details/ramcharitmanas_202204 to jump
  to the same page in the browser reader.
- Verse numbers (the ॥N॥ shown next to doha/soratha/shlok) can occasionally
  have a wrong digit (OCR confusing e.g. १ and २) — the verse itself is
  still in the correct position in the kand, just the printed label may be off.
- The very last verse in each kand may be missing its meaning/number, since
  its commentary continued onto the first page of the next kand and the
  page ranges above don't cross that boundary.
- छंद (chhand) units, and occasionally an opening dedicatory दोहा/सोरठा
  right after a kand's shlokas, don't carry their own number in this
  edition — `number` is `null` for those, which is expected, not a bug.

## Editing content directly

Each file is `{ "slug": "...", "verses": [...] }`, where each verse is:

```json
{
  "id": 1,
  "type": "chaupai",
  "text": "देवनागरी में मूल पाठ",
  "meaning": "हिन्दी अर्थ",
  "number": "१"
}
```

- `type` is one of `shlok`, `chaupai`, `doha`, `soratha`, `chhand`.
- `meaning` and `number` are nullable.
- `id` just needs to be unique and increasing within the file — it's the React list key.

## Adding a Kand's audio (listen alongside reading)

Each Kand page has a "listen" panel on the left (sticky while scrolling the
text), so visitors can listen to the Kand, not just read it. It shows a
"coming soon" placeholder (using that Kand's own subtitle/description as
the teaser) until you add a YouTube video ID. In `src/content/kands.ts`,
add `youtubeId` to that Kand's entry:

```ts
{
  slug: "sundar-kand",
  ...
  youtubeId: "dQw4w9WgXcQ", // the part after watch?v= in the YouTube URL
},
```

That's it — the panel switches to an embedded player automatically.
