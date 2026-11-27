# Hiện trạng giao diện Docs

Cập nhật ngày 27/11/2026. **Code là nguồn sự thật.** Các file trong `reference/`, `styles/`, `scripts/`
là bản thiết kế gốc để đối chiếu, web không dùng tới.

## Phạm vi

- Thiết kế "Raymond Docs" trong thư mục này áp dụng cho Docs (`/raymond/docs/`), chạy trên Starlight (lộ trình A).
- Trang chủ dùng chung token màu và nút đổi theme, nhưng có thiết kế riêng:
  xem [HOME_HANDOFF.md](../astro-home-handoff/HOME_HANDOFF.md).
- Blog vẫn dùng giao diện phỏng theo AgenceX (`src/styles/global.css`, `src/layouts/Layout.astro`).

## Sửa ở đâu

| Việc | File |
| :-- | :-- |
| Token màu, bóng (**dùng chung với trang chủ**) | `src/styles/tokens.css` |
| Font, layout, component, responsive | `src/styles/raymond-theme.css` |
| Cấu hình Starlight, khung code, số dòng, sidebar | `astro.config.mjs` |
| Đầu bài (breadcrumb, nhãn nhóm, tiêu đề, ngày, nút toàn màn hình), ô số ở H2 / H3 | `src/components/docs/PageTitle.astro` |
| Footer chung của Docs; ẩn footer bài HTML nhúng và tự giãn khung | `src/components/docs/Footer.astro` |
| Logo, menu Blog / Docs | `src/components/docs/SiteTitle.astro` |
| Link trên header và trong menu di động | `src/components/docs/SocialIcons.astro` |
| Nút Sáng / Tối / Hệ thống | `src/components/docs/ThemeSelect.astro` |
| Component cho bài `.mdx` | `Spec`, `SpecRow`, `Badge`, `ConsolePath`, `Tex`, `Icon` trong `src/components/docs/` |

## Đầu bài

Gọn trên một hàng (`.page-head`): nhãn nhóm, tiêu đề (tối đa 28px), rồi dồn sang phải là thời gian đọc,
ngày cập nhật và nút **Toàn màn hình**. Màn hình hẹp thì tự xuống hàng. Giữ phần này thấp để nội dung
hiện sớm, đừng phóng to tiêu đề lại theo bản thiết kế.

## Bài HTML nhúng

File HTML đặt trong `public/lessons/`. Nội dung file `.md` chỉ cần một thẻ:

```html
<iframe class="lesson-frame" src="/raymond/lessons/page/.../ten-bai.html" title="Tên bài"></iframe>
```

- Nút **Toàn màn hình** tự hiện, không viết link tay.
- `PageTitle.astro` nhận ra bài nhúng bằng đúng chuỗi `<iframe class="lesson-frame" src="`. Giữ thứ tự
  `class` rồi `src`, nếu không nút sẽ không hiện.
- Bài nhúng không hiện thời gian đọc.

## Khác bản thiết kế (có chủ ý, đừng hoàn tác)

| Chỗ | Bản thiết kế | Hiện tại | Lý do |
| :-- | :-- | :-- | :-- |
| Khung code, nền tối | nền `#0a0c11`, đầu `#10131a`, viền 8% | `#141822`, `#1a1f2a`, viền 12% | Bản gốc gần trùng nền trang |
| Số dòng | mọi khung, `#3b4252` | `#6b7385`; không đánh số lệnh terminal và văn bản thuần | Dễ đọc; lệnh để chép chạy |
| Số đầu H2 | "01" trơn | ô bo góc, lấy số gõ sẵn trong bài | Số trơn trông lạc lõng |
| Callout | component `Callout` | `Aside` của Starlight | Handoff cho phép |
| Đầu bài | nhãn, tiêu đề lớn, đoạn dẫn, dòng thông tin xếp dọc | một hàng gọn, đoạn dẫn nằm dưới | Bản xếp dọc chiếm quá nhiều chỗ |
| Mục lục dưới 1200px | ẩn | hộp "Trên trang này" | Chủ dự án yêu cầu từ trước |
| Nhóm sidebar | một số mở sẵn | thu gọn, nhóm chứa trang đang xem tự mở | Giữ cấu hình cũ |
| "Cập nhật lần cuối" cuối bài | có (Starlight) | bỏ, ngày hiện ở đầu bài | Tránh lặp |
| Công thức toán | không có | `<Tex tex="..." />` (KaTeX, dựng lúc build) | Cần cho bài thuật toán |

## Chưa làm

- Tags, ô số liệu (`.stats`), "Chỉnh sửa trên GitHub", "Lên đầu trang", thanh trượt ở mục lục.
- Chỉ `vps-free-tier.mdx` dùng bộ component. Hỏi chủ dự án trước khi chuyển hàng loạt.
- `ssh-linux.md` và `cloudflare-tunnel.md` còn dùng `> [!NOTE]`, đang hiện thành trích dẫn thường.
- Chưa đối chiếu đủ mọi độ rộng với `design.html` (mới so ở 1440px nền tối).
- Blog chưa theo thiết kế này.
- Bài HTML nhúng giữ nền sáng cả khi web ở theme tối.

## Lưu ý khi phát triển tiếp

- Mốc co giãn: dưới 1200px ẩn mục lục phải; dưới 900px sidebar thành drawer (cần sửa cả CSS và script
  trong `astro.config.mjs`); từ 600px trở xuống spec card một cột.
- Theme dùng `data-theme` và key `starlight-theme` của Starlight; key `theme` dùng chung với trang chủ và Blog.
  Không dùng `scripts/theme-init.js`.
- Icon nhóm trong sidebar gắn theo thứ tự (`nth-child`). Thêm hoặc đổi thứ tự nhóm thì phải sửa CSS.
- Astro 7 xử lý Markdown bằng Sätteri, plugin remark / rehype không chạy trực tiếp.
- Sau khi đổi cấu hình khung code, xoá `.astro` và `node_modules/.astro` rồi chạy lại.
- Kiểm tra cả Sáng và Tối ở 1440, 768, 375px.
