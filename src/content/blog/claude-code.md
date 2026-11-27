---
title: 'Giới thiệu Claude Code'
description: 'Công cụ lập trình theo hướng agent của Anthropic: làm được gì, cài thế nào.'
pubDate: 2026-11-27
category: 'AI Tools'
---

**Claude Code** là công cụ lập trình theo hướng agent của Anthropic. Nó đọc codebase, sửa file, chạy lệnh và làm việc cùng các công cụ phát triển bạn đang dùng.

![Vòng làm việc của Claude Code](/raymond/blog-images/claude-code-loop.svg)

## Dùng ở đâu

- Terminal (CLI)
- Extension cho VS Code và Cursor
- Plugin cho JetBrains (cần cài CLI riêng)
- Ứng dụng desktop (cần gói trả phí)
- Trên web tại [claude.ai/code](https://claude.ai/code) và ứng dụng di động Claude

## Làm được gì

- Viết tính năng, sửa lỗi.
- Tạo commit và pull request.
- Tích hợp GitHub Actions, GitLab CI/CD.
- Kết nối công cụ ngoài qua MCP.
- Ghi nhớ quy ước dự án trong file `CLAUDE.md`, mở rộng bằng skills và hooks.
- Chia việc cho subagent, hoặc chạy không cần giao diện bằng `claude -p`.

## Cài đặt

Trên macOS, Linux và WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Trên Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Hoặc dùng Homebrew: `brew install --cask claude-code`.

Sau đó vào thư mục dự án và chạy:

```bash
cd du-an-cua-ban
claude
```

Lần đầu chạy sẽ được yêu cầu đăng nhập.

## Chi phí

Claude Code không bán riêng. Nó đi kèm gói Claude trả phí, gói Free không có. Cũng có thể trả theo token qua API. Xem [bài so sánh giá](/raymond/blog/so-sanh-gia-antigravity-claude-code/).

## Nguồn

- [Tài liệu Claude Code](https://code.claude.com/docs/en/overview)
- [Bảng giá Claude](https://claude.com/pricing)
