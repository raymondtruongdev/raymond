# Hạn chế hiện tại

Ghi ngày 27/11/2026.

## Docs

| Hạn chế | Ảnh hưởng | Hướng xử lý |
| :------ | :-------- | :---------- |
| Bài HTML được nhúng bằng iframe | Ô tìm kiếm chỉ tìm được tiêu đề, không tìm nội dung bên trong | Chuyển các bài cần tìm kiếm sang Markdown |
| Khung bài HTML tự giãn theo nội dung | Thanh dính (sticky / fixed) bên trong bài không còn bám theo khi cuộn | Dùng nút "Mở toàn màn hình" |
| Bài HTML luôn nền sáng | Không đổi theo dark mode | Thêm dark mode vào từng file trong `public/lessons/` |
| Bài HTML tải thư viện từ CDN (Tailwind, highlight.js...) | CDN lỗi hoặc mất mạng thì bài hiển thị sai | Đưa thư viện vào `public/` |
| Đường dẫn trong bài nhúng và ảnh blog ghi cứng từ gốc `/` | Chuyển web vào đường dẫn con (thêm `base`) thì các link này bị hỏng | Sửa đường dẫn trong `src/content/` |
| Trang mục lục viết tay | Thêm bài mới phải tự thêm link | Sửa `src/content/docs/docs/index.md` |
| Giao diện co giãn ghi đè CSS nội bộ của Starlight (`raymond-theme.css`, các component trong `src/components/docs/`) | Nâng cấp Starlight có thể làm lệch bố cục | Xem lại Docs sau mỗi lần nâng cấp |
| Icon nhóm trong sidebar gắn theo thứ tự (`nth-child`) | Thêm hoặc đổi thứ tự nhóm thì icon bị lệch | Sửa trong `raymond-theme.css` |
| Hai bài `ssh-linux` và `cloudflare-tunnel` dùng `> [!NOTE]` | Hiện thành trích dẫn thường, không phải callout | Đổi sang `:::note` |
| Bài Cloudflare Tunnel có hai mục "Bước 3" (từ bản gốc) | Dễ nhầm thứ tự | Đánh số lại |

## Phần còn lại của web

| Hạn chế | Ghi chú |
| :------ | :------ |
| Blog chưa có tìm kiếm, lọc chủ đề, mục lục | Làm khi có nhiều bài |
| Không có form liên hệ | GitHub Pages không có backend, đang dùng link email |
| Email hiển thị công khai | Có thể bị gửi spam |
| Mục tiếng Anh chỉ ghi "TOEIC" | Thêm điểm trong `src/data/profile.ts` |

## Chưa chuyển từ web cũ

Thư mục `test_ai`, các file `temp*.html`, `demo` và CV trong `intro/` chưa đưa sang vì trang mục lục cũ không liệt kê.
