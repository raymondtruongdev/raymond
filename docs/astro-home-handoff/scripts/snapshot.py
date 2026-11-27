"""Tạo lại reference/home.html từ bản build. Chạy ở thư mục gốc repo: npm run build && python3 docs/astro-home-handoff/scripts/snapshot.py"""
import pathlib
import re

LIVE = 'https://raymondtruongdev.github.io'
FONTS = (
    '<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800'
    '&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
)

dist = pathlib.Path('dist')
asset = lambda href: (dist / href.removeprefix('/raymond/')).read_text()


def inline_css(match):
    # Font lấy từ Google Fonts để file mở được trực tiếp bằng trình duyệt
    return '<style>' + re.sub(r'@font-face\s*\{[^}]*\}', '', asset(match[1])) + '</style>'


html = (dist / 'index.html').read_text()
html = re.sub(r'<link rel="stylesheet" href="([^"]+)"\s*/?>', inline_css, html)
html = re.sub(r'<script type="module" src="([^"]+)"></script>', lambda m: '<script type="module">' + asset(m[1]) + '</script>', html)
html = re.sub(r'<img src="/raymond/_astro/avatar[^"]*"', '<img src="../../../public/avatar.png"', html)
html = re.sub(r'(href=")(/raymond/)', rf'\g<1>{LIVE}\g<2>', html)
html = html.replace('</head>', FONTS + '</head>')
pathlib.Path('docs/astro-home-handoff/reference/home.html').write_text(html)
