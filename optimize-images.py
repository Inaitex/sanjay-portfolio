#!/usr/bin/env python3
"""Generate optimized thumb (600px) and full (1600px) JPGs for every image in /images/.

Outputs to /images-opt/ mirroring the source tree. Skips files already up-to-date.
Run after dropping new images into /images/.

Usage:
    python3 optimize-images.py
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow required. Install with: pip3 install Pillow")

ROOT = Path(__file__).parent.resolve()
SRC = ROOT / "images"
DST = ROOT / "images-opt"

THUMB_EDGE = 600
FULL_EDGE = 1600
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def resize_if_larger(img: Image.Image, max_edge: int) -> Image.Image:
    """Resize so the longest edge is <= max_edge. Returns same image if already smaller."""
    w, h = img.size
    if max(w, h) <= max_edge:
        return img
    if w >= h:
        new_w = max_edge
        new_h = round(h * max_edge / w)
    else:
        new_h = max_edge
        new_w = round(w * max_edge / h)
    return img.resize((new_w, new_h), Image.LANCZOS)


def process_file(src_path: Path) -> tuple[int, int]:
    """Return (thumb_written, full_written). 1 = wrote, 0 = skipped (up-to-date)."""
    rel = src_path.relative_to(SRC)
    stem = rel.with_suffix("")
    thumb_path = DST / stem.with_name(stem.name + "-thumb.jpg")
    full_path = DST / stem.with_name(stem.name + "-full.jpg")

    src_mtime = src_path.stat().st_mtime
    thumb_fresh = thumb_path.exists() and thumb_path.stat().st_mtime >= src_mtime
    full_fresh = full_path.exists() and full_path.stat().st_mtime >= src_mtime
    if thumb_fresh and full_fresh:
        return (0, 0)

    thumb_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        with Image.open(src_path) as raw:
            raw = ImageOps.exif_transpose(raw)
            if raw.mode in ("RGBA", "P", "LA"):
                bg = Image.new("RGB", raw.size, (255, 250, 237))
                if raw.mode == "P":
                    raw = raw.convert("RGBA")
                bg.paste(raw, mask=raw.split()[-1] if raw.mode in ("RGBA", "LA") else None)
                raw = bg
            else:
                raw = raw.convert("RGB")

            thumb_written = full_written = 0
            if not thumb_fresh:
                thumb = resize_if_larger(raw, THUMB_EDGE)
                thumb.save(thumb_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
                thumb_written = 1
            if not full_fresh:
                full = resize_if_larger(raw, FULL_EDGE)
                full.save(full_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
                full_written = 1
            return (thumb_written, full_written)
    except Exception as e:
        print(f"  ! Failed {src_path.name}: {e}", file=sys.stderr)
        return (0, 0)


def main():
    if not SRC.is_dir():
        sys.exit(f"Source folder not found: {SRC}")
    DST.mkdir(exist_ok=True)

    files = [p for p in SRC.rglob("*") if p.is_file() and p.suffix.lower() in EXTS]
    print(f"Scanning {len(files)} images under {SRC.name}/")

    total_thumb = total_full = skipped = 0
    for i, p in enumerate(files, 1):
        t, f = process_file(p)
        total_thumb += t
        total_full += f
        if t == 0 and f == 0:
            skipped += 1
        if i % 20 == 0 or i == len(files):
            print(f"  [{i}/{len(files)}] thumbs:{total_thumb} full:{total_full} skipped:{skipped}")

    print(f"\nDone. {total_thumb} thumbs + {total_full} full versions written. {skipped} up-to-date.")
    print(f"Output: {DST}")


if __name__ == "__main__":
    main()
