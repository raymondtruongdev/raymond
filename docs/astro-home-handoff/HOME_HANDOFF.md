# Thiết kế trang chủ — Raymond Truong (Astro)

> Mô tả thiết kế **đang chạy** của trang chủ (`/`), để sau này chỉnh sửa.
> Cập nhật ngày 27/11/2026. Nếu tài liệu và code khác nhau thì **code trong `src/` đúng**.
> Bản handoff gốc (trước khi triển khai) xem trong lịch sử git, commit "Add the original home design handoff".

## 1. File nằm ở đâu

| Cần sửa | File |
|---|---|
| Thứ tự các phần, tiêu đề tab, mô tả SEO | `src/pages/index.astro` |
| `<head>`, script chặn nháy theme, khung trang | `src/layouts/HomeLayout.astro` |
| Các phần của trang | `src/components/home/*.astro` |
| Dữ liệu: số liệu, lĩnh vực, kinh nghiệm, kỹ năng, học vấn, ngôn ngữ, email, GitHub, file CV | `src/data/profile.ts` |
| Màu, bóng (dùng chung với Docs) | `src/styles/tokens.css` |
| Bố cục và component trang chủ | `src/styles/home.css` |
| Menu mobile, "Xem thêm", hiện dần khi cuộn | `src/scripts/home-ui.ts` |
| Ảnh đại diện | `src/assets/avatar.png` (bản `public/avatar.png` giữ cho URL cũ) |

Trong thư mục này:

| File | Vai trò |
|---|---|
| `reference/home.html` | Bản chụp trang hiện tại, mở thẳng bằng trình duyệt (font cần mạng) |
| `reference/home-light.png`, `home-dark.png` | Ảnh cả trang ở bề rộng 1440px |
| `reference/home-mobile.png` | Ảnh cả trang ở bề rộng 375px, bản sáng |
| `reference/icons-sprite.svg` | Bộ icon nét mảnh |
| `styles/home.css`, `scripts/home-ui.ts` | Bản chụp CSS và script để tham khảo |
| `scripts/snapshot.py` | Tạo lại `reference/home.html` |

## 2. Bố cục trang

| Thứ tự | Component | Neo | Nội dung |
|---|---|---|---|
| — | `Header` | | Logo R, menu Giới thiệu · Kinh nghiệm · Blog · Docs, theme switch dạng icon, nút Liên hệ |
| — | `Hero` + `Portrait` | | Eyebrow có chấm xanh, H1 (cụm cuối màu nhấn), lede, vị trí, 3 nút, ảnh tròn |
| — | `ProofStrip` | | 4 số liệu, dòng "Từng làm việc tại" (logo là chữ cách điệu) |
| 01 | `Expertise` | `#chuyen-mon` | 4 thẻ lĩnh vực |
| 02 | `Timeline` + `TimelineItem` | `#kinh-nghiem` | Cột trái cố định khi cuộn, timeline bên phải |
| 03 | `About` | `#gioi-thieu` | Giới thiệu và kỹ năng, học vấn, ngôn ngữ |
| 04 | `LatestPosts` | `#blog` | 3 bài mới nhất của collection `blog` |
| — | `ContactCTA` | `#lien-he` | Nút Gửi email và GitHub |
| — | `Footer` | | Bản quyền, link Blog · Docs · GitHub · Lên đầu trang |

Ảnh đại diện: khung tròn, vòng accent cách 10px, glow phía sau. **Không có thẻ nổi** đè lên ảnh và **không có nhãn "nhận dự án freelance"**.

## 3. Quy tắc thiết kế

- Chỉ một màu nhấn xanh ngọc. Không gradient chữ, không xanh dương, không emoji.
- Font: **Be Vietnam Pro** (tiêu đề), **Inter** (nội dung), **JetBrains Mono** (nhãn, ngày, tag). Nạp từ `@fontsource`.
- Không thêm thư viện UI/CSS hay gói icon. Trang chủ không dùng Tailwind.
- Nội dung rộng tối đa 1200px. Header cao 60px. Khoảng cách giữa các phần 104px (mobile 80px).
- Thẻ: nền `--surface`, viền `--border`, bo 14–22px. Hover đổi viền sang `--accent-line`.
- Chuyển động nhẹ, tắt hết khi `prefers-reduced-motion`.

### Màu

| Token | Sáng | Tối | Dùng cho |
|---|---|---|---|
| `--bg` | `#fbfbfa` | `#0b0d12` | Nền trang |
| `--surface` | `#ffffff` | `#11141b` | Thẻ |
| `--text` | `#14161c` | `#e6e8ee` | Tiêu đề |
| `--text-2` | `#3d424e` | `#c3c8d4` | Nội dung |
| `--muted` | `#646b7a` | `#8b93a7` | Chữ phụ |
| `--accent` | `#059669` | `#34d399` | Icon, đường kẻ |
| `--accent-text` | `#047857` | `#34d399` | Chữ màu nhấn |
| `--btn-bg` / `--btn-text` | `#047857` / `#ffffff` | `#34d399` / `#052e22` | Nút chính |

Danh sách đầy đủ ở `src/styles/tokens.css`. Mặc định là tối, sáng khi `<html data-theme="light">`.
Sửa token sẽ **đổi cả Docs**. Riêng `--glow` được trang chủ ghi đè trong `home.css` (Docs có pha xanh dương).

### Responsive

| Bề rộng | Thay đổi |
|---|---|
| ≤ 1100px | Thẻ lĩnh vực 2 cột; timeline 1 cột; phần Giới thiệu 2 cột |
| ≤ 899px | Menu vào drawer; ảnh nằm giữa phía trên tiêu đề; số liệu 2 cột; bài viết 1 cột |
| ≤ 600px | Mọi lưới 1 cột (số liệu giữ 2); nút hero rộng hết hàng |

Đường kính ảnh tối đa: 420px, 320px (≤ 899px), 260px (≤ 600px).

## 4. Hành vi

- **Theme:** dùng `src/components/docs/ThemeSelect.astro`. Key `starlight-theme` (Docs) và `theme` (Blog). Script trong `HomeLayout` đặt theme trước khi vẽ trang.
- **Menu mobile:** đóng khi bấm nút, chạm ngoài, chọn mục, nhấn Escape, hoặc mở rộng cửa sổ từ 900px.
- **Timeline:** mục đầu được tô sáng. `points` luôn hiện, `more` ẩn sau nút "Xem thêm".
- **Không có JS:** nội dung hiện đầy đủ, không có nút "Xem thêm".

## 5. Cách thay đổi thường gặp

- **Thêm chỗ làm:** thêm một phần tử vào đầu mảng `experiences` trong `profile.ts`.
- **Đổi CV:** CV nằm trên Google Drive, sửa `cvUrl` trong `profile.ts`. Ai có link đều xem được, nên kiểm tra thông tin cá nhân trong đó trước.
- **Bài viết mới:** thêm file vào `src/content/blog/`. Tag trên thẻ là `category`.
- **Thêm icon:** thêm `<symbol id="i-tên">` vào `Icons.astro`, dùng `<Icon name="tên" />`.
- **Chữ viết thẳng trong component:** H1 và lede (`Hero`), logo công ty (`ProofStrip`), câu phụ (`Timeline`), đoạn giới thiệu (`About`), lời mời (`ContactCTA`).
- **Đổi tên neo:** sửa cả link trong `Header.astro` (trang chủ) và `src/layouts/Layout.astro` (Blog).

## 6. Kiểm tra sau khi sửa

1. `npm run build` không lỗi, console sạch.
2. 1440, 768, 375px: không tràn ngang, cả bản sáng và tối.
3. Đổi theme rồi qua Docs và Blog: theme giữ nguyên.
4. Menu mobile, "Xem thêm", link neo không bị header che.
5. Lighthouse Accessibility ≥ 95.
6. Nếu đổi giao diện: tạo lại `reference/` và cập nhật tài liệu này.

## 7. Còn để ngỏ

- Lighthouse Accessibility **chưa được đo**.
- Blog vẫn dùng giao diện cũ (`Layout.astro`, Tailwind, xanh dương).
- "Body Composition" (thẻ AI) và kỹ năng "Python" không có trong CV bản 09/2026.
- Dải "Từng làm việc tại" chưa có NTU.
- Ô số liệu "5 năm AI wearable @ Fossil" vẫn giữ.
