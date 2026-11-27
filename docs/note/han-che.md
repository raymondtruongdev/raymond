# Hạn chế hiện tại

Ghi ngày 27/11/2026.

## Docs

| Hạn chế | Ảnh hưởng | Hướng xử lý |
| :------ | :-------- | :---------- |
| Bài HTML được nhúng bằng iframe | Ô tìm kiếm chỉ tìm được tiêu đề, không tìm nội dung bên trong | Chuyển các bài cần tìm kiếm sang Markdown |
| Bài HTML luôn nền sáng | Không đổi theo dark mode | Thêm dark mode vào từng file trong `public/lessons/` |
| Khung bài HTML cao cố định (80% màn hình) | Bài dài phải cuộn bên trong khung | Dùng nút "Mở toàn màn hình" |
| Bài HTML tải thư viện từ CDN (Tailwind, highlight.js...) | CDN lỗi hoặc mất mạng thì bài hiển thị sai | Đưa thư viện vào `public/` |
| Đường dẫn trong bài nhúng ghi cứng `/raymond/` | Đổi tên repo thì các bài này bị hỏng | Sửa đường dẫn trong `src/content/docs/docs/` |
| Trang mục lục viết tay | Thêm bài mới phải tự thêm link | Sửa `src/content/docs/docs/index.md` |
| Giao diện co giãn ghi đè CSS nội bộ của Starlight (`docs.css`, `PageTitle.astro`) | Nâng cấp Starlight có thể làm lệch bố cục | Xem lại Docs sau mỗi lần nâng cấp |
| Bài Cloudflare Tunnel có hai mục "Bước 3" (từ bản gốc) | Dễ nhầm thứ tự | Đánh số lại |

## Phần còn lại của web

| Hạn chế | Ghi chú |
| :------ | :------ |
| Blog chưa có tìm kiếm, lọc chủ đề, mục lục | Làm khi có nhiều bài |
| Bài "Xin chào" là bài mẫu | Sửa hoặc xoá `src/content/blog/xin-chao.md` |
| Không có form liên hệ | GitHub Pages không có backend, đang dùng link email |
| Email hiển thị công khai | Có thể bị gửi spam |
| Mục tiếng Anh chỉ ghi "TOEIC" | Thêm điểm trong `src/data/profile.ts` |

## Chưa chuyển từ web cũ

Thư mục `test_ai`, các file `temp*.html`, `demo` và CV trong `intro/` chưa đưa sang vì trang mục lục cũ không liệt kê.
