#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gen_favicon.py — 程序化生成博客专属 favicon 全套图标
设计主题：秋江明月（呼应博客署名 "The limpid moon above the autumn river" 与暖橙主色）
产出（写入 static/）：
  favicon.ico         多尺寸（16/32/48/64）
  favicon-16x16.png   16x16
  favicon-32x32.png   32x32
  apple-touch-icon.png 180x180
用法:  python bin/gen_favicon.py
"""
import math
import os

from PIL import Image, ImageDraw

S = 512  # 源图边长
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_icon():
    # ---------- 1. 夜空渐变背景 ----------
    top = (13, 24, 48)      # 顶部深蓝
    bot = (36, 58, 102)     # 底部稍亮
    img = Image.new("RGBA", (S, S))
    d = ImageDraw.Draw(img)
    for y in range(S):
        d.line([(0, y), (S, y)], fill=lerp(top, bot, y / (S - 1)) + (255,))

    # ---------- 2. 星光 ----------
    stars = [(92, 118, 5), (404, 88, 4), (330, 178, 3), (150, 226, 3), (440, 300, 3)]
    for x, y, r in stars:
        d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 235))

    # ---------- 3. 月亮光晕（多层半透明橙） ----------
    mx, my, mr = S // 2, 235, 102
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i in range(10, 0, -1):
        r = mr + i * 13
        a = int(26 * (1 - i / 11))  # 越外层越淡
        gd.ellipse([mx - r, my - r, mx + r, my + r], fill=(255, 180, 66, a))
    img = Image.alpha_composite(img, glow)
    d = ImageDraw.Draw(img)

    # ---------- 4. 圆月 ----------
    d.ellipse([mx - mr, my - mr, mx + mr, my + mr], fill=(255, 196, 92, 255))
    # 月亮表面一点淡纹理（左上暗角，制造立体感）
    d.ellipse([mx - mr, my - mr, mx + mr - 18, my + mr - 18],
              outline=(232, 166, 62, 255), width=0)
    d.ellipse([mx - 58, my - 70, mx + 2, my - 12], fill=(238, 172, 74, 110))
    d.ellipse([mx + 22, my + 26, mx + 66, my + 62], fill=(240, 178, 78, 100))

    # ---------- 5. 江水与月光倒影 ----------
    water_y = 402
    # 月光带（月亮正下方的淡橙光柱，上宽下窄）
    band = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    bd = ImageDraw.Draw(band)
    for yy in range(water_y, S, 2):
        t = (yy - water_y) / (S - water_y)
        half = int((52 - 12 * t) * (1 - t * 0.55))
        a = int(60 * (1 - t) * 0.7 + 18)
        bd.rectangle([mx - half, yy, mx + half, yy + 2], fill=(255, 196, 92, a))
    img = Image.alpha_composite(img, band)
    d = ImageDraw.Draw(img)

    # 江水波浪线（三蓝渐层，模拟水面）
    def wave(y_base, amp, phase, color, width):
        pts = []
        for x in range(-8, S + 8, 4):
            pts.append((x, y_base + amp * math.sin(x / 78 + phase)))
        d.line(pts, fill=color, width=width, joint="curve")

    wave(water_y + 8, 7, 0.0, (120, 160, 214, 200), 4)
    wave(water_y + 34, 6, 1.4, (96, 138, 196, 190), 4)
    wave(water_y + 60, 5, 2.9, (74, 112, 172, 185), 4)
    wave(water_y + 84, 4, 4.2, (56, 90, 148, 175), 4)

    return img.convert("RGB")


def main():
    os.makedirs(OUT, exist_ok=True)
    icon = make_icon()

    icon.save(os.path.join(OUT, "favicon.ico"),
              sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    icon.resize((16, 16), Image.LANCZOS).save(os.path.join(OUT, "favicon-16x16.png"))
    icon.resize((32, 32), Image.LANCZOS).save(os.path.join(OUT, "favicon-32x32.png"))
    icon.resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, "apple-touch-icon.png"))
    print("OK 已生成: favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png")


if __name__ == "__main__":
    main()
