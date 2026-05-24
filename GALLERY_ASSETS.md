# Gallery & Brand Asset Wiring Guide

This portfolio has **19 image galleries** + a **brands logo strip**, all powered by an optimized image pipeline and a single JS manifest.

## The image pipeline

Two folders work together:

| Folder | Purpose | In git? |
|---|---|---|
| `images/` | **Source originals** — drop full-resolution photos here, organized by section/event | Keep originals private if you prefer; can be gitignored |
| `images-opt/` | **Auto-generated optimized versions** — `-thumb.jpg` (600px max, ~50 KB) and `-full.jpg` (1600px max, ~250 KB) | Commit; this is what the site loads |

### Adding new images

1. Drop new originals into the appropriate subfolder under `images/`
2. Run the optimizer:
   ```bash
   python3 optimize-images.py
   ```
   It walks `images/`, generates `-thumb` and `-full` JPGs into `images-opt/` mirroring the tree, skips files already up-to-date, and reports counts.
3. Update the `GALLERIES` manifest in `sanjay-portfolio.html` to reference the new optimized paths (see format below)
4. Refresh the page

**Pillow required** — install with `pip3 install Pillow` if you don't have it.

## How galleries render on the page

Each card type has a different visual treatment:

| Card type | What appears | Click behavior |
|---|---|---|
| **CEO feature card** (full-width) | 3 thumbnails + "+N MORE" tile below the role details | Click any tile → opens modal at that image index |
| **Other leadership cards** | 4:3 cover photo at top of each card | Click cover → opens modal at first image |
| **Speaking cards** | 4:3 cover photo at top | Click cover → modal |
| **Achievement cards** | Square cover photo at top | Click cover → modal |
| **Featured Works** (Elevate Hub) | Gold "Featured Works →" button under each service list | Click button → modal |
| **Brands strip** | Logo row between Impact and Anugraha Niketan | (No click — just a logo display) |

The modal lightbox supports keyboard navigation: **← → arrows** to navigate, **Esc** to close, **click outside** to close.

## GALLERIES manifest format

Find `const GALLERIES = {` near the top of the `<script>` block. Each entry uses this shape:

```js
'lead-ceo': {
  title: "CEO — Commerce Conglomeration",
  images: [
    { thumb: "images-opt/.../01-thumb.jpg", full: "images-opt/.../01-full.jpg" },
    { thumb: "images-opt/.../02-thumb.jpg", full: "images-opt/.../02-full.jpg" },
    ...
  ]
},
```

Notes:
- **`thumb`** is shown on the card cover + thumb strip (600px, fast loading, lazy-loaded)
- **`full`** is shown in the modal (1600px, higher quality)
- Use **double-quoted** title strings (titles like `Arthashasthra'25` contain apostrophes that break single-quoted strings)
- **Empty `images: []`** hides the card cover entirely — useful for galleries you haven't shot yet

The Python helper at the end of this file shows how to regenerate the entire manifest from a folder mapping if you'd rather not edit by hand.

## All 19 gallery IDs

### Leadership (6 — `#leadership`)

| ID | Title | Current source folder |
|---|---|---|
| `lead-ceo` | CEO — Commerce Conglomeration | `images/Leadership & campus Contributions/CEO - Commerce Conglomeration/{Investiture Ceremony, ED Pavilion Flagship, ED week VRDDHI 2024 & ED Pavilion 2.0}/` |
| `lead-digital` | Digital Head — COMMEX'22 | `images/Leadership & campus Contributions/Digital Head - COMMEX 22/` |
| `lead-president` | President — COMMERZIUM'23 | `images/Leadership & campus Contributions/President - COMMERZIUM 23/` |
| `lead-marketing` | Marketing Head — NSS | `images/Leadership & campus Contributions/Marketing Head - NSS/` |
| `lead-advisor` | Management Advisor — International Conference | **No folder yet — using profile-picture placeholder** |
| `lead-head` | Head Position — MERFESTA'24 | `images/Leadership & campus Contributions/MERFESTA_24/` |

### Speaking / Guest Appearances (6 — `#speaking`)

| ID | Title | Current source folder |
|---|---|---|
| `speak-investiture` | Alumni Guest — Investiture Ceremony 2025 | `images/Guest Appearances & Speaking/Alumni Guest for - C2 - Investiture Ceremony 2025/` |
| `speak-arthashasthra` | Chief Guest — Arthashasthra'25 | `images/Guest Appearances & Speaking/Chief Guest For Arthashasthra_25/` |
| `speak-freshers` | Alumni Guest — Freshers Inauguration 2025 | `images/Guest Appearances & Speaking/Alumni Guest for Freshers inauguration year 2025/` |
| `speak-guest-lecture` | Guest Lecture — Digital Marketing & E-Commerce | **No folder — placeholder** |
| `speak-fusion` | Judge — Fusion'26 | `images/Guest Appearances & Speaking/Judge for Fusion 26/` |
| `speak-luminex` | Judge — Luminex'26 | `images/Guest Appearances & Speaking/Judge for luminex_26/` |

### Achievements (5 — `#achievements`)

| ID | Title | Current source folder |
|---|---|---|
| `ach-best-student` | Best Student of the Year | `images/Achievements & Recognitions/Best Student Award/` |
| `ach-regularity` | Regularity Award — 2 Times | `images/Achievements & Recognitions/Regularity award/` |
| `ach-leadership` | Leadership & Event Excellence Awards | `images/Achievements & Recognitions/{ED Pavilion 24, MERFESTA_24}/` |
| `ach-multiple` | Recognition for Multiple Leadership Roles | **No dedicated folder — placeholder** |
| `ach-cofounder` | Honoured as Co-Founder of Commerce Conglomeration | `images/Achievements & Recognitions/Commerzium 23/` |

### Featured Works (2 — Elevate Hub section)

| ID | Title | Current state |
|---|---|---|
| `work-offline` | Featured Works — Offline Branding | **No images — placeholder. When you have Drive images for offline-branding works, drop them into a new folder and add to manifest.** |
| `work-event` | Featured Works — Event Branding | **No images — placeholder. Same as above for event-branding works.** |

### Brands strip (separate from galleries)

The section between Impact and Anugraha Niketan is driven by a separate `BRAND_LOGOS` array:

```js
const BRAND_LOGOS = [
  { src: 'images-opt/brands/foo-thumb.jpg', name: 'Foo Brand' },
  { src: 'images-opt/brands/bar-thumb.jpg', name: 'Bar Co.' },
];
```

Currently populated with **5 placeholder entries** all using the profile picture so the strip renders for visual review. Replace each `src` and `name` once you have real logos. Logos render in monochrome by default and turn full color on hover. Empty array hides the entire section.

## Placeholder galleries needing real images

Five galleries currently use the profile picture as a placeholder so you can see the trigger render. Replace when real images arrive:

- `lead-advisor` (Management Advisor)
- `speak-guest-lecture` (Guest Lecture — Digital Marketing & E-Commerce)
- `ach-multiple` (Multiple Leadership Role Recognitions)
- `work-offline` (Featured Works — Offline Branding)
- `work-event` (Featured Works — Event Branding)

## Pending contact-section placeholders

Two contact slots are visually pending (faded, non-clickable):

- **Email** — currently "After domain purchase". Once your domain email is live, edit the `<span class="ccard-val">After domain purchase</span>` line in the contact section, change the wrapper `<span>` to `<a href="mailto:...">`, and remove the `ccard-pending` class.
- **LinkedIn** — currently "Link to be provided". Same pattern.

## Anugraha Niketan poster

The `#building` section's right-side card shows a placeholder. To add the launch poster:

1. Save the image to `images/anugraha-niketan/poster.jpg`
2. Run `python3 optimize-images.py` to generate optimized versions
3. Update the `.building-visual` element in HTML to include `<img src="images-opt/anugraha-niketan/poster-full.jpg">`

## Notes on the optimization

- The optimizer respects EXIF orientation so phone photos don't render rotated
- Re-running is safe; it skips files where the optimized version is newer than the source
- Original heavy PNGs and JPGs (the `images/` folder was ~704 MB) get compressed to ~40 MB total in `images-opt/`
- If you want to keep `images/` out of git (since `images-opt/` is what the site needs), add `images/` to `.gitignore` — but keep the optimizer script committed so anyone with the originals can regenerate
