# Design Handoff — Raymond Docs (Astro)

> **ĐÃ ÁP DỤNG (27/11/2026). Đọc [HIEN_TRANG.md](HIEN_TRANG.md) trước khi sửa giao diện.**
> Web hiện tại đã khác tài liệu này ở một số chỗ có chủ ý. Không chạy lại hướng dẫn bên dưới và
> không "sửa cho đúng mẫu" nếu chủ dự án không yêu cầu. File này giữ làm bản thiết kế gốc.

> **Dành cho AI agent** (Claude Code, Cursor…) đang làm việc trong repo Astro của Raymond.
> Nhiệm vụ: áp dụng thiết kế trong thư mục này (giao diện Sáng / Tối) vào site hiện có,
> **giữ nguyên nội dung, routing và cấu trúc thư mục** — đây là re-skin, không phải viết lại site.

## 0. Các file trong gói này

| File | Vai trò |
|---|---|
| `reference/design.html` | **Nguồn sự thật.** Trang mẫu hoàn chỉnh, mở thẳng bằng trình duyệt để so sánh. Mọi markup, class, icon SVG (`<symbol id="i-…">`) lấy từ đây. |
| `styles/raymond-docs.css` | Toàn bộ CSS của thiết kế (tokens + component + responsive), đã tách khỏi `design.html`. |
| `scripts/theme-init.js` | Script chặn nháy theme — phải chạy **inline trong `<head>`**, trước CSS paint. |
| `scripts/docs-ui.js` | Tương tác: switcher Sáng/Tối/Hệ thống, ⌘K, thu gọn sidebar, drawer mobile, nút copy, TOC scroll-spy. |

## 1. Bước đầu tiên: khảo sát repo (bắt buộc, trước khi sửa)

Xác định và ghi lại cho user:
1. **Dùng Starlight (`@astrojs/starlight`) hay layout tự viết?** Kiểm tra `astro.config.*` và `package.json`.
   (Ảnh chụp site hiện tại — header Blog/Docs, select “Tối/Sáng”, “Trên trang này”, ⌘K — rất giống Starlight.)
2. Có dùng **View Transitions / `<ClientRouter />`** không.
3. Có Tailwind không; CSS global đang nằm ở đâu.
4. Nội dung là `.md` hay `.mdx`; nơi định nghĩa sidebar.
5. Code block đang render bằng gì (Expressive Code, Shiki mặc định, Prism).

Rồi chọn **Lộ trình A (Starlight)** hoặc **Lộ trình B (layout tự viết)** bên dưới. Tạo branch mới trước khi sửa.

---

## 2. Design tokens (giữ chính xác các giá trị này)

Toàn bộ nằm ở đầu `styles/raymond-docs.css`. Theme điều khiển bằng attribute **`<html data-theme="light|dark">`**
(+ `data-pref="light|dark|system"` để nhớ lựa chọn). Không dùng class `.dark`.

| Token | Sáng | Tối |
|---|---|---|
| `--bg` | `#fbfbfa` (giấy trắng ngà) | `#0b0d12` (graphite ánh xanh — **không đen tuyền**) |
| `--surface` / `--surface-2` | `#fff` / `#f5f5f2` | `#11141b` / `#151922` |
| `--border` | `#ebebe8` | `rgba(255,255,255,.07)` |
| `--text` / `--text-2` / `--muted` | `#14161c` / `#3d424e` / `#646b7a` | `#e6e8ee` / `#c3c8d4` / `#8b93a7` |
| `--accent` | `#059669` | `#34d399` |
| Warning (amber) | `--warn-bg #fffaeb`, rail `#d97706` | `rgba(245,158,11,.07)`, rail `#f59e0b` |
| Tip (sky) | `--tip-bg #f0f8fd`, rail `#0284c7` | `rgba(56,189,248,.06)`, rail `#38bdf8` |
| Code block | luôn tối: `--code-bg #0f1218` | `#0a0c11` |

**Font** (có subset tiếng Việt): Be Vietnam Pro 500–800 (heading, UI label), Inter 400–600 (body, 16.5px / line-height 1.75), JetBrains Mono 400–500 (code).
Ưu tiên tự host bằng `@fontsource/be-vietnam-pro`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (import weight + subset `vietnamese`) thay vì Google Fonts link; nếu giữ link thì lấy nguyên thẻ `<link>` trong `design.html`.

---

## 3. Lộ trình A — Site dùng Starlight

Không chép nguyên `raymond-docs.css` (selector của nó không khớp DOM của Starlight). Thay vào đó:

1. **Tokens → biến Starlight.** Tạo `src/styles/raymond-theme.css`, thêm vào `starlight({ customCss: [...] })`.
   Starlight dùng `:root` cho dark và `:root[data-theme='light']` cho light. Ánh xạ:
   - `--sl-color-black` ← `--bg` (dark `#0b0d12`); `--sl-color-gray-6/5` ← surface/border; `--sl-color-white` ← `--text`
   - `--sl-color-accent-low / accent / accent-high` ← dark `#0d2a22 / #34d399 / #a7f3d0`, light `#d1fae5 / #059669 / #065f46`
   - Light: `--sl-color-white: #14161c`, `--sl-color-black: #fbfbfa`, gray scale theo bảng token ở trên.
   - `--sl-font: 'Inter'…`, `--sl-font-mono: 'JetBrains Mono'…`; heading dùng Be Vietnam Pro qua `.sl-markdown-content :is(h1,h2,h3)` và `h1#_top`.
   - `--sl-text-body` ≈ `1.03rem`, `--sl-line-height` `1.75`, `--sl-content-width` ≈ `47.5rem`.
2. **Theme switch**: Starlight đã có `data-theme` + localStorage key `starlight-theme` → **không** dùng `theme-init.js`.
   Override component `ThemeSelect` (`components: { ThemeSelect: './src/components/ThemeSelect.astro' }`) để render segmented control `.seg` (Sáng / Tối / Hệ thống) như `design.html`, gọi `StarlightThemeProvider.updatePickers()` / ghi `starlight-theme` = `light|dark|auto`.
3. **Header**: override `Header` nếu cần nền mờ (`backdrop-filter: blur`, `--header-bg`), brand mark, link Blog/Docs có gạch accent dưới mục active. Giữ `<Search />` của Starlight, chỉ style lại khung thành `.search`.
4. **Sidebar**: chỉ CSS — mục active có thanh accent 2px bên trái + nền `--accent-soft` (xem `.group-items a[aria-current="page"]`), nhóm `<details>` dùng chevron xoay. Không đổi cấu hình sidebar.
5. **TOC phải**: CSS cho `starlight-toc a[aria-current="true"]` → màu accent + thanh trái 2px. Indicator trượt (`#tocInd`) là tùy chọn; nếu làm thì override `TableOfContents`.
6. **Asides → callout**: style `.starlight-aside--caution` = callout `warn`, `--tip` = `tip`, `--note` = `note` (thanh rail trái, ô icon, tiêu đề màu riêng — xem `.callout*` trong CSS).
7. **Code block**: Starlight dùng Expressive Code → cấu hình trong `expressiveCode: { styleOverrides: { borderRadius: '12px', codeBackground: '#0f1218', frames: { … } }, themes: ['github-dark-default'] }` sao cho khung luôn tối ở cả hai theme như thiết kế. Không tự viết lại nút copy (EC đã có) — chỉ style.
8. **Spec card / Path chips** → tạo component MDX ở mục 5.

## 4. Lộ trình B — Layout Astro tự viết

1. Copy `styles/raymond-docs.css` → `src/styles/raymond-docs.css`, import một lần trong layout gốc.
   Nếu dự án có CSS global cũ xung đột (reset, `h1`, `code`, `a`…), gộp/xóa phần cũ, đừng để hai bộ cùng chạy.
2. Trong `<head>` của layout gốc (ví dụ `src/layouts/BaseLayout.astro`), **trước** stylesheet:
   ```astro
   <script is:inline>/* nội dung scripts/theme-init.js */</script>
   ```
   `is:inline` là bắt buộc để không bị bundle/defer (tránh nháy trắng khi load trang tối).
3. Tách markup `design.html` thành component (giữ đúng class):
   - `Header.astro` (`.header`, `.brand`, `.nav`, `.search`, `.seg`, `.hamburger`)
   - `Sidebar.astro` (`aside.sidebar` > `.group[data-open]` > `.group-btn` + `.group-items`) — render từ dữ liệu sidebar hiện có, đánh dấu `aria-current="page"` bằng `Astro.url.pathname`.
   - `Toc.astro` (`aside.toc`, `#toc`, `#tocInd`) — dùng `headings` từ `render()` của content collection (depth 2–3).
   - `DocLayout.astro` ghép `.layout` 3 cột + `<main><article>` + `Pager.astro` (`nav.pager`) + `.page-glow`.
   - `Icons.astro` chứa sprite `<svg><symbol id="i-…">` lấy từ đầu `<body>` của `design.html`.
4. Thêm `scripts/docs-ui.js` vào `src/scripts/docs-ui.js` và load bằng `<script>` (Astro sẽ bundle).
   **Nếu dùng `<ClientRouter />`**: bọc phần khởi tạo trong `document.addEventListener('astro:page-load', init)`, và thêm
   `document.addEventListener('astro:after-swap', () => { /* chạy lại logic theme-init */ })` để theme không bị reset khi chuyển trang.
5. Markdown thường cần class mà Markdown không sinh ra: H2 có số (`.num`), H3 có chip chữ (`.letter`).
   Làm bằng CSS counter trên `article h2/h3`, hoặc một rehype plugin nhỏ — **không** bắt user sửa tay toàn bộ bài viết.
   Danh sách `ul` trong bài dùng style `article ul.list` → đổi selector thành `article ul` (hoặc `.prose ul`).

## 5. Component MDX dùng lại (cả hai lộ trình)

Tạo trong `src/components/docs/`, markup y hệt `design.html`:

- `Callout.astro` — props `type: 'warn' | 'tip' | 'note'`, `title`. (Starlight: có thể bỏ, dùng aside.)
- `Spec.astro` + `SpecRow.astro` — thẻ cấu hình: `title`, `icon`, `badge` (vd “Đủ điều kiện Free Tier”); mỗi hàng `label`, `hint`, slot giá trị, prop `danger` để tô hàng amber.
- `Badge.astro` — `variant: 'good' | 'must' | 'no'`.
- `ConsolePath.astro` — prop `steps: string[]`, chip cuối có class `last`.

Ví dụ trong MDX:
```mdx
<Spec title="Boot disk" icon="shield">
  <SpecRow label="Boot disk type" hint="Bắt buộc" danger>
    `Standard persistent disk` <Badge variant="must">Không để Balanced</Badge>
  </SpecRow>
</Spec>
```
Chỉ chuyển bài **“Tạo máy ảo Google Cloud VPS Free Tier”** sang dùng các component này làm mẫu; các bài khác giữ Markdown thường, hỏi user trước khi chuyển hàng loạt.

## 6. Lỗi đã biết trong bản thiết kế — sửa luôn khi port

1. Dưới 900px, hàng `dt.danger-row` + `dd.danger-row` của spec card xếp chồng và có hai sắc amber khác nhau, thanh rail bị đứt → khi stack, dùng chung một nền và kéo rail qua cả label lẫn value.
2. Ở 375px header tràn mép phải ~12px → giảm gap/padding header ở `max-width: 600px`, cho `.seg` thu gọn.
3. Spec card chuyển 1 cột ở 899px quá sớm → giữ 2 cột tới 600px.
4. Light mode: glow + grid gần như vô hình → tăng nhẹ alpha của `--glow` (≈ .14) và `--grid-line` (≈ .05) cho theme sáng.
5. Nhỏ: scroll-spy offset (`+120`) nên khớp `scroll-padding-top` (88px); `--faint` ở light nên đậm hơn (≈ `#767c88`) để đạt 4.5:1; drawer mobile cần nút đóng.

## 7. Tiêu chí hoàn thành

- `npm run build` chạy không lỗi; không lỗi console.
- So sánh từng trang với `reference/design.html` ở 1440px, 768px, 375px, **cả Sáng lẫn Tối** — màu, font, khoảng cách khớp.
- Tải lại trang ở chế độ Tối: không nháy trắng. Chọn “Hệ thống” rồi đổi theme OS: site đổi theo.
- ⌘K / Ctrl K focus ô tìm kiếm; sidebar thu gọn được; nút copy hoạt động; TOC highlight đúng mục.
- Không tràn ngang ở 375px. Focus ring hiển thị khi dùng bàn phím.
- Không đổi URL, frontmatter hay nội dung bài viết (trừ bài mẫu ở mục 5).
- Báo lại cho user danh sách file đã sửa/tạo và ảnh chụp trước/sau.
