# Hướng dẫn sử dụng

Web cá nhân làm bằng [Astro](https://docs.astro.build), chạy trên GitHub Pages:
https://raymondtruongdev.github.io/raymond/

## Chạy trên máy

Cần Node.js 22.23.4 trở lên (không dùng bản số lẻ như 23, 25).

```sh
npm install       # chỉ cần khi mới clone hoặc đổi dependencies
npm run dev       # mở http://localhost:4321/raymond/
```

## Cấu trúc

| Đường dẫn                      | Nội dung                              |
| :----------------------------- | :------------------------------------ |
| `src/data/profile.ts`          | Kinh nghiệm, kỹ năng, học vấn         |
| `src/pages/index.astro`        | Trang chủ (giới thiệu, liên hệ)       |
| `src/content/blog/`            | Bài viết blog (Markdown)              |
| `src/layouts/Layout.astro`     | Header, menu, footer, nút sáng / tối  |
| `src/styles/global.css`        | Bảng màu và kiểu chữ                  |
| `public/`                      | Ảnh, file tĩnh                        |
| `astro.config.mjs`             | Cấu hình `site` và `base`             |
| `.github/workflows/deploy.yml` | Tự động deploy                        |

Giao diện dùng [Tailwind CSS](https://tailwindcss.com), phỏng theo theme [AgenceX](https://github.com/uno-forge-hub/agency-landing-page-Astrojs) (giấy phép MIT, xem `THIRD_PARTY_LICENSES.md`).

## Viết bài blog

Tạo `src/content/blog/ten-bai.md`, bài sẽ có địa chỉ `/raymond/blog/ten-bai/`:

```md
---
title: 'Tiêu đề'
description: 'Mô tả ngắn'
pubDate: 2026-11-26
category: 'Embedded'
---

Nội dung bài viết.
```

## Viết Docs

Docs dùng [Starlight](https://starlight.astro.build), địa chỉ `/raymond/docs/`.

Mỗi chủ đề là một thư mục trong `src/content/docs/docs/`: `algo`, `cpp`, `html`, `git`, `vps`.

**Bài Markdown:** tạo `src/content/docs/docs/vps/ten-bai.md`, bài tự hiện trong sidebar.

```md
---
title: 'Tiêu đề'
sidebar:
  order: 8
---

## Mục đầu tiên
```

**Bài HTML tĩnh:** đặt file vào `public/lessons/page/<chu-de>/ten-bai.html`, rồi tạo file `.md` để nhúng:

```md
---
title: 'Tiêu đề'
tableOfContents: false
---

<a href="/raymond/lessons/page/<chu-de>/ten-bai.html" target="_blank">Mở toàn màn hình ↗</a>

<iframe class="lesson-frame" src="/raymond/lessons/page/<chu-de>/ten-bai.html" title="Tiêu đề"></iframe>
```

Màu, font và bố cục của Docs nằm trong `src/styles/raymond-theme.css`.

**Component cho bài `.mdx`** (trong `src/components/docs/`), xem mẫu ở `vps/vps-free-tier.mdx`:

| Component              | Dùng để                                                          |
| :--------------------- | :--------------------------------------------------------------- |
| `Spec` + `SpecRow`     | Thẻ cấu hình; `danger` tô hàng cảnh báo                          |
| `Badge`                | Nhãn `good`, `must`, `no`                                        |
| `ConsolePath`          | Đường dẫn bấm trong console                                      |
| `Tex`                  | Công thức toán: `<Tex tex="O(n^2)" />`                           |
| `Aside` của Starlight  | Khung `note`, `tip`, `caution` (trong `.md` viết `:::note ... :::`) |

Ô tìm kiếm chỉ tìm được tiêu đề của bài HTML, không tìm nội dung bên trong.

**Chủ đề mới:** tạo thư mục mới, rồi thêm vào `sidebar` trong `astro.config.mjs`:

```js
{ label: 'Tên nhóm', collapsed: true, items: [{ autogenerate: { directory: 'docs/ten-thu-muc' } }] },
```

Nhớ thêm link bài mới vào trang mục lục `src/content/docs/docs/index.md`.

## Thêm trang mới

Tạo `src/pages/projects.astro`, trang sẽ có địa chỉ `/raymond/projects/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Dự án | Raymond">
	<h1 class="text-3xl font-semibold">Dự án</h1>
</Layout>
```

Muốn hiện trên menu thì thêm vào `navigation` trong `src/layouts/Layout.astro`:

```js
{ title: 'Dự án', href: url('projects/') },
```

## Thêm ảnh

Đặt ảnh vào `public/`, ví dụ `public/robot.jpg`, rồi dùng trong trang:

```astro
---
import { url } from '../lib/url';
---

<img src={url('robot.jpg')} alt="Robot arm" />
```

Dòng `import` đặt trong phần `---` ở đầu file. Link và ảnh nội bộ luôn phải đi qua `url()`, nếu không sẽ bị 404 trên GitHub Pages.

## Deploy

```sh
npm run build     # kiểm tra build không lỗi
git add .
git commit -m "Mô tả thay đổi"
git push          # push lên main là tự deploy
```

Theo dõi tại tab [Actions](https://github.com/raymondtruongdev/raymond/actions).

## Gặp lỗi

| Lỗi                      | Cách xử lý                                                                    |
| :----------------------- | :---------------------------------------------------------------------------- |
| Web báo 404              | Kiểm tra đã push chưa, và Settings → Pages → Source là **GitHub Actions**     |
| Workflow báo đỏ          | Mở log trong tab Actions, chạy `npm run build` trên máy để tìm lỗi            |
| Ảnh hoặc link bị hỏng    | Kiểm tra đã dùng `url()` chưa                                                  |
| Đổi tên repo             | Sửa `base` trong `astro.config.mjs` (bỏ hẳn nếu tên là `<username>.github.io`) |
