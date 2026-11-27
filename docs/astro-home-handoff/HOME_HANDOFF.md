# Home Handoff — Raymond Truong homepage (Astro)

> **Dành cho AI agent** làm việc trong repo Astro của Raymond.
> Phạm vi: **chỉ trang chủ** (`/`, thường là `src/pages/index.astro`). Bộ theme Docs (tokens, font,
> theme switch Sáng/Tối/Hệ thống, script chặn nháy) **đã được áp dụng** từ `DESIGN_HANDOFF.md` trước —
> tái sử dụng, không cài lại, không sửa trang Docs.

## 0. Các file trong gói

| File | Vai trò |
|---|---|
| `reference/home.html` | **Nguồn sự thật**: bản mẫu hoàn chỉnh, mở thẳng bằng trình duyệt. Markup, class, nội dung lấy từ đây. |
| `reference/home-light.png`, `home-dark.png` | Ảnh chụp 1440px để so sánh kết quả. |
| `reference/icons-sprite.svg` | Sprite icon nét mảnh (`<symbol id="i-…">`), dùng bằng `<svg><use href="#i-watch"/></svg>`. |
| `styles/home.css` | Toàn bộ CSS của trang mẫu (gồm cả phần trùng với theme Docs — xem mục 2). |
| `scripts/home-ui.js` | Theme switch (trùng Docs), menu mobile, nút "Xem thêm" timeline, hiệu ứng hiện khi cuộn. |

## 1. Khảo sát trước khi sửa

1. Tìm file trang chủ và layout nó dùng; liệt kê component hiện có (Header, Hero, Footer…).
2. Tìm nơi đã đặt tokens/theme của Docs (vd `src/styles/raymond-docs.css` hoặc `raymond-theme.css`, script `theme-init` trong layout gốc).
3. Kiểm tra dữ liệu trang chủ hiện lấy từ đâu (hard-code, `src/data/*.json|ts`, content collection) — **giữ nguồn dữ liệu đó**; bài viết mới phải lấy từ collection blog thật, không hard-code.
4. Tạo branch mới (vd `home-redesign`), báo user kế hoạch ngắn trước khi sửa.

## 2. CSS: chỉ thêm phần riêng của trang chủ

`styles/home.css` có 3 lớp nội dung — xử lý khác nhau:

| Phần trong `home.css` | Xử lý |
|---|---|
| Tokens dùng chung (`--bg`, `--surface`, `--text`, `--accent`… ở đầu file, khối `:root`, `@media (prefers-color-scheme)`, `:root[data-theme="dark"]`) | **Bỏ** — đã có từ theme Docs. |
| Tokens **mới** chỉ trang chủ cần: `--shadow-lg`, `--accent-text`, `--btn-bg`, `--btn-bg-hover`, `--btn-text`, `--portrait-glow` (cả bản sáng lẫn tối) | **Thêm** vào file tokens chung hiện có (cạnh tokens Docs), để Blog/Docs cũng dùng được nút mới. |
| Base trùng (`*`, `html`, `body`, `a`, `:focus-visible`, `::selection`, `.page-glow`) | **Bỏ** nếu global đã có; chỉ giữ khác biệt thật sự (vd `scroll-behavior: smooth`). |
| Component trang chủ: `.hero`, `.portrait`, `.frame`, `.float-card`, `.btn*`, `.proof`, `.stat*`, `.section*`, `.card*`, `.timeline`/`.tl-*`, `.toggle`, `.tag`, `.post*`, `.cta`, `.footer`, `.drawer`, `.reveal`, media queries | **Giữ**, đặt vào `src/styles/home.css` (hoặc `<style>` trong từng component). |

- Nếu `.header`, `.seg`, `.btn`, `.wrap` trùng tên class với CSS Docs mà khác giá trị → bọc CSS trang chủ dưới `.home` (thêm `class="home"` vào `<body>`/`<main>` của trang chủ) thay vì sửa CSS Docs.
- Header: nếu site đã có header chung (sau handoff Docs) thì **dùng lại**, chỉ đổi menu thành **Giới thiệu · Kinh nghiệm · Blog · Docs** + nút "Liên hệ" + theme switch dạng icon. Không tạo header thứ hai.

## 3. Tách component

Trong `src/components/home/` (giữ đúng class như `home.html`):

| Component | Nội dung |
|---|---|
| `Hero.astro` | eyebrow + pill "Đang nhận dự án freelance", H1 (cụm cuối bọc `<em>` màu accent), lede, vị trí, 3 nút, `Portrait` |
| `Portrait.astro` | **khung tròn** (`.frame` `border-radius: 50%`), vòng accent cách 10px, glow sau ảnh, `float-card` "5 năm · AI cho thiết bị đeo @ Fossil". Ảnh: dùng `avatar.png` **đang có trong repo** qua `astro:assets` `<Image>` (width/height 587, `loading="eager"`, alt tiếng Việt như mẫu). Không phóng to/cắt ảnh. |
| `ProofStrip.astro` | 4 số liệu + dòng "Từng làm việc tại: Fossil · Mijo · ĐH Bách Khoa TP.HCM" |
| `Expertise.astro` | 4 thẻ lĩnh vực, icon `i-brain`, `i-chip`, `i-phone`, `i-bot` — **không emoji** |
| `Timeline.astro` + `TimelineItem.astro` | props: `role`, `company`, `period`, `points[]`, `more[]`, `tags[]`; hiện 3 ý, phần `more` ẩn sau nút "Xem thêm"/"Thu gọn" (`aria-expanded`) |
| `About.astro` | giới thiệu + kỹ năng (tag) + học vấn + ngôn ngữ |
| `LatestPosts.astro` | 3 bài mới nhất từ `getCollection('blog')` sắp theo ngày giảm dần; tag, ngày `dd/mm/yyyy`, tiêu đề, mô tả, "Đọc tiếp" |
| `ContactCTA.astro` | "Cùng làm dự án tiếp theo", nút "Gửi email" + GitHub |
| `Icons.astro` | nội dung `reference/icons-sprite.svg`, render một lần trong layout (nếu Docs đã có sprite thì gộp các symbol còn thiếu vào) |

Dữ liệu kinh nghiệm/kỹ năng/số liệu: đặt vào `src/data/profile.ts` (một mảng typed) nếu repo chưa có nơi tương tự, để sửa nội dung không cần đụng markup.

## 4. Script

- **Theme switch trong `home-ui.js` là bản sao của Docs → bỏ**, dùng script theme đã có (cùng key `rd-theme`, `data-theme`, `data-pref`). Nếu site dùng Starlight thì theme key là `starlight-theme` — giữ đúng cái đang chạy.
- Giữ: menu mobile (`#menuBtn`, `#drawer`, `#scrim`, Escape), toggle "Xem thêm", reveal on scroll (IntersectionObserver, tắt khi `prefers-reduced-motion`).
- Đặt vào `src/scripts/home-ui.ts`, import bằng `<script>` trong `index.astro`. Nếu dùng `<ClientRouter />`: khởi tạo trong `document.addEventListener('astro:page-load', init)` và tránh gắn listener hai lần.
- Phần tử `.reveal` phải **hiển thị bình thường khi JS tắt** (chỉ ẩn khi `<html>` có class do JS thêm vào).

## 5. Nội dung cần user cung cấp — hỏi, đừng tự bịa

- Link **CV PDF** (nút "Tải CV" trong mẫu đang trỏ `#`) — nếu repo có file CV trong `public/` thì dùng nó.
- Email thật cho nút "Gửi email" (mẫu dùng `mailto:hello@example.com`); hỏi user muốn hiện email hay chỉ dùng nút `mailto:`.
- Link GitHub (mẫu đoán `https://github.com/raymondtruongdev`) — xác nhận.
- Tag từng mục kinh nghiệm và tag blog trong mẫu là **đoán** — dùng tag thật từ frontmatter bài blog.
- Logo công ty ở dải "Từng làm việc tại" đang là chữ cách điệu; chỉ thay bằng logo ảnh nếu user cung cấp.

## 6. Không được làm

- Không đổi URL, không sửa trang Docs/Blog (ngoài việc thêm tokens nút mới vào file tokens chung).
- Không thêm thư viện UI/CSS mới (Tailwind, icon packages…) chỉ để làm trang này — dùng CSS và sprite trong gói.
- Không dùng gradient chữ, màu xanh dương, emoji — thiết kế chỉ có một màu nhấn xanh ngọc.

## 7. Tiêu chí hoàn thành

- `npm run build` không lỗi; console sạch.
- So với `reference/home-light.png` / `home-dark.png` ở 1440px: bố cục, màu, font, khoảng cách khớp. Kiểm thêm 768px và 375px: không tràn ngang, ảnh tròn nằm giữa phía trên tiêu đề trên mobile.
- Đổi theme ở trang chủ rồi sang Docs (và ngược lại): theme giữ nguyên, không nháy.
- Menu mobile mở/đóng (nút, chạm ngoài, Escape); "Xem thêm" hoạt động; link neo cuộn tới đúng mục, không bị header che.
- Lighthouse Accessibility ≥ 95; ảnh có alt; focus ring hiển thị khi dùng bàn phím.
- Báo lại user: danh sách file đã tạo/sửa, ảnh chụp trước/sau (sáng + tối, desktop + mobile), và các mục ở phần 5 còn chờ thông tin.
