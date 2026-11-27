---
title: 'Giới thiệu Google Antigravity'
description: 'Nền tảng lập trình theo hướng agent của Google: có gì, cài thế nào.'
pubDate: 2026-11-27
category: 'AI Tools'
---

Nhiều người gọi là "Gemini Antigravity", nhưng tên chính thức là **Google Antigravity**. Google mô tả đây là nền tảng phát triển theo hướng agent: bạn giao việc, các agent lập kế hoạch và thực hiện.

![Sơ đồ các thành phần của Google Antigravity](/raymond/blog-images/antigravity-surfaces.svg)

## Dùng ở đâu

| Thành phần | Dùng để |
| :-- | :-- |
| Antigravity App | Ứng dụng desktop điều phối nhiều agent chạy trên máy |
| Antigravity CLI | Chạy agent trong terminal, lệnh `agy` |
| Antigravity IDE | Trình soạn thảo riêng, có khung quản lý agent |
| Extensions | Cắm vào VS Code, JetBrains, Zed, Xcode và các editor khác |
| Antigravity SDK | Thư viện Python để tự xây agent |

Có cả bản web, và hỗ trợ macOS, Windows, Linux.

## Tính năng đáng chú ý

- Nhiều subagent chạy song song, tách biệt bằng Git worktree.
- Lệnh `/plan` để lập kế hoạch trước khi làm.
- Dùng trình duyệt Chromium trong sandbox để tự kiểm tra giao diện.
- Xem kết quả qua artifact và diff trực quan.
- Mở rộng bằng skills, MCP, rules và hooks.

## Model

Trang giá của Google liệt kê các model Gemini cùng một số model Claude. Một số model cũ được ghi là sẽ bị gỡ ngày 30/11/2026, nên hãy xem danh sách mới nhất trước khi chọn.

## Cài đặt CLI

Trên macOS và Linux:

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

Trên Windows PowerShell:

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

Ứng dụng desktop tải tại [antigravity.google/download](https://antigravity.google/download).

## Chi phí

Có gói miễn phí cho cá nhân với hạn mức làm mới hằng tuần. Muốn dùng nhiều hơn thì mua gói Google AI. Xem chi tiết trong [bài so sánh giá](/raymond/blog/so-sanh-gia-antigravity-claude-code/).

## Nguồn

- [Tổng quan Antigravity](https://antigravity.google/docs/overview)
- [Bảng giá Antigravity](https://antigravity.google/pricing)
