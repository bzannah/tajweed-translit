#!/usr/bin/env python3
"""
Tajweed Translit — Page Re-Inking for Maximum Readability
==========================================================
Detects tajweed color coding (red, green, blue, orange) in scanned
Quran pages and RE-PAINTS with vivid, maximally readable target colors.

This is NOT image enhancement — it's color detection + re-inking.
The algorithm classifies every pixel by its hue, then replaces faint/dark
colors with bright, vivid versions while preserving stroke shapes.

Why this works:
  In the original scans, green text has luminance ~14 vs black text ~10
  (almost indistinguishable). No amount of "enhancement" fixes that.
  Re-inking detects green by its hue and repaints it as vivid (0,150,0).

Requirements:
  pip install opencv-python-headless Pillow

Usage:
  python reink_quran_pages.py --input ./pages --output ./reinked
  python reink_quran_pages.py -i ./pages -o ./reinked -q 88 -w 4

Tunable target colors (edit below):
  TARGET_RED    = (200, 0, 0)     — Madd / prolongation markers
  TARGET_GREEN  = (0, 150, 0)     — Ghunnah / nasalization markers
  TARGET_BLUE   = (0, 45, 200)    — Tafkheem / emphasis markers
  TARGET_ORANGE = (210, 115, 0)   — Permissible prolongation
  TARGET_BLACK  = (12, 12, 12)    — Standard text
"""

import argparse
import os
import sys
import time
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor, as_completed

import cv2
import numpy as np
from PIL import Image, ImageFilter


# =============================================
# TUNABLE TARGET COLORS (RGB 0-255)
# Edit these to adjust the final appearance
# =============================================
TARGET_RED    = np.array([200,   0,   0], dtype=np.float32)
TARGET_GREEN  = np.array([  0, 150,   0], dtype=np.float32)
TARGET_BLUE   = np.array([  0,  45, 200], dtype=np.float32)
TARGET_ORANGE = np.array([210, 115,   0], dtype=np.float32)
TARGET_BLACK  = np.array([ 12,  12,  12], dtype=np.float32)

# Noise floor — ink strength below this is treated as background
NOISE_THRESH = 0.08


def reink_quran_page(input_path: str, output_path: str, quality: int = 92) -> dict:
    """
    Re-ink a single Quran page for maximum readability.
    """
    try:
        img = Image.open(input_path)
        original_size = os.path.getsize(input_path)
        arr = np.array(img).astype(np.float32)
        h, w = arr.shape[:2]

        # ---- HSV conversion ----
        rgb_n = arr / 255.0
        r, g, b = rgb_n[:, :, 0], rgb_n[:, :, 1], rgb_n[:, :, 2]

        max_c = np.maximum(np.maximum(r, g), b)
        min_c = np.minimum(np.minimum(r, g), b)
        delta = max_c - min_c

        V = max_c
        S = np.where(max_c > 0.001, delta / max_c, 0)

        H = np.zeros_like(S)
        dm = delta > 0.001
        mr = dm & (max_c == r)
        mg = dm & (max_c == g)
        mb = dm & (max_c == b)
        H[mr] = 60 * (((g[mr] - b[mr]) / delta[mr]) % 6)
        H[mg] = 60 * (((b[mg] - r[mg]) / delta[mg]) + 2)
        H[mb] = 60 * (((r[mb] - g[mb]) / delta[mb]) + 4)
        H = H % 360

        # ---- Background estimation & ink strength ----
        gray = np.mean(arr, axis=2)
        blur_r = max(w, h) // 40
        bg_blur = np.array(
            Image.fromarray(gray.astype(np.uint8)).filter(
                ImageFilter.GaussianBlur(radius=blur_r)
            )
        ).astype(np.float32)

        ink_strength = np.clip(1.0 - (gray / np.maximum(bg_blur, 1)), 0, 1)
        ink_strength = np.clip(ink_strength * 1.8, 0, 1)
        ink_strength[ink_strength < NOISE_THRESH] = 0

        # ---- Pixel classification ----
        is_dark_enough = gray < (bg_blur - 12)

        adaptive_sat = np.where(V < 0.2, 0.13, 0.20)
        has_color = S > adaptive_sat
        is_colored = is_dark_enough & has_color

        is_red = is_colored & ((H < 25) | (H > 335))
        is_green = is_colored & (H >= 65) & (H < 175)
        is_blue = is_colored & (H >= 175) & (H < 275)
        is_orange = is_colored & (H >= 25) & (H < 65)
        is_black = is_dark_enough & (~is_colored)

        # ---- Morphological cleanup ----
        kernel = np.ones((3, 3), np.uint8)
        masks = {"red": is_red, "green": is_green, "blue": is_blue, "orange": is_orange}
        for name in masks:
            m = masks[name].astype(np.uint8)
            m = cv2.morphologyEx(m, cv2.MORPH_OPEN, kernel)
            m = cv2.dilate(m, kernel, iterations=1)
            masks[name] = (m > 0) & is_colored

        is_red, is_green, is_blue, is_orange = (
            masks["red"], masks["green"], masks["blue"], masks["orange"]
        )

        # ---- Re-ink ----
        output = np.full_like(arr, 255.0)

        for mask, target in [
            (is_black, TARGET_BLACK),
            (is_red, TARGET_RED),
            (is_green, TARGET_GREEN),
            (is_blue, TARGET_BLUE),
            (is_orange, TARGET_ORANGE),
        ]:
            if mask.sum() == 0:
                continue
            strength = np.power(ink_strength[mask], 0.7)
            strength = np.clip(strength, 0, 1)

            for c in range(3):
                output[mask, c] = target[c] * strength + 255.0 * (1 - strength)

        # ---- Ornamental borders: blend enhanced original ----
        sat_u8 = (S * 255).astype(np.uint8)
        sat_blur = cv2.GaussianBlur(sat_u8, (31, 31), 0).astype(np.float32) / 255
        ornament_mask = (sat_blur > 0.12) & is_colored & (~is_black)

        if ornament_mask.sum() > 0:
            hsv_o = cv2.cvtColor(arr.astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
            hsv_o[:, :, 1] = np.clip(hsv_o[:, :, 1] * 1.5, 0, 255)
            hsv_o[:, :, 2] = np.clip(hsv_o[:, :, 2] * 1.15, 0, 255)
            enh = cv2.cvtColor(hsv_o.astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32)

            blend = 0.5
            for c in range(3):
                output[ornament_mask, c] = (
                    output[ornament_mask, c] * blend + enh[ornament_mask, c] * (1 - blend)
                )

        # ---- Final output ----
        output = np.clip(output, 0, 255).astype(np.uint8)
        result = Image.fromarray(output)
        result = result.filter(ImageFilter.UnsharpMask(radius=0.8, percent=50, threshold=2))

        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
        result.save(output_path, "WEBP", quality=quality)

        new_size = os.path.getsize(output_path)
        n = h * w
        return {
            "file": os.path.basename(input_path),
            "status": "ok",
            "original_kb": original_size / 1024,
            "reinked_kb": new_size / 1024,
            "pct_red": is_red.sum() / n * 100,
            "pct_green": is_green.sum() / n * 100,
            "pct_blue": is_blue.sum() / n * 100,
        }
    except Exception as e:
        return {"file": os.path.basename(input_path), "status": "error", "error": str(e)}


def main():
    parser = argparse.ArgumentParser(
        description="Re-ink Quran pages for maximum tajweed color readability."
    )
    parser.add_argument("--input", "-i", required=True, help="Input directory")
    parser.add_argument("--output", "-o", required=True, help="Output directory")
    parser.add_argument("--quality", "-q", type=int, default=92, help="WebP quality (default: 92)")
    parser.add_argument("--workers", "-w", type=int, default=None, help="Parallel workers")
    parser.add_argument("--pattern", "-p", default="*.webp", help="Glob pattern")
    args = parser.parse_args()

    input_dir = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(input_dir.glob(args.pattern))
    if not files:
        print(f"No files matching '{args.pattern}' in {input_dir}")
        sys.exit(1)

    print(f"Re-inking {len(files)} pages")
    print(f"Output: {output_dir}  |  Quality: {args.quality}  |  Workers: {args.workers or 'auto'}")
    print("-" * 70)

    start = time.time()
    results = []

    with ProcessPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(
                reink_quran_page, str(f), str(output_dir / f.name), args.quality
            ): f
            for f in files
        }
        for i, future in enumerate(as_completed(futures), 1):
            r = future.result()
            results.append(r)
            if r["status"] == "ok":
                print(
                    f"  [{i}/{len(files)}] {r['file']}  "
                    f"{r['original_kb']:.0f}KB -> {r['reinked_kb']:.0f}KB  "
                    f"R={r['pct_red']:.1f}% G={r['pct_green']:.1f}% B={r['pct_blue']:.1f}%"
                )
            else:
                print(f"  [{i}/{len(files)}] {r['file']}  ERR: {r.get('error')}")

    elapsed = time.time() - start
    ok = sum(1 for r in results if r["status"] == "ok")
    print("-" * 70)
    print(f"Done in {elapsed:.1f}s  |  {ok}/{len(results)} pages processed")
    if ok > 0:
        orig = sum(r["original_kb"] for r in results if r["status"] == "ok")
        new = sum(r["reinked_kb"] for r in results if r["status"] == "ok")
        print(f"Total: {orig / 1024:.1f}MB -> {new / 1024:.1f}MB")


if __name__ == "__main__":
    main()
