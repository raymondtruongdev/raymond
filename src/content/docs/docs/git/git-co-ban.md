---
sidebar:
  order: 0
title: 'Git cơ bản'
description: 'Các lệnh Git hay dùng.'
---

## Xem trạng thái

```sh
git status
git log --oneline -10
git diff
```

## Lưu thay đổi

```sh
git add .
git commit -m "Mô tả thay đổi"
git push
```

## Làm việc với nhánh

```sh
git switch -c ten-nhanh     # tạo và chuyển sang nhánh mới
git switch main             # quay về main
git merge ten-nhanh         # gộp nhánh vào nhánh hiện tại
git branch -d ten-nhanh     # xoá nhánh đã gộp
```

## Hoàn tác

```sh
git restore ten-file           # bỏ thay đổi chưa commit (không lấy lại được)
git restore --staged ten-file  # bỏ khỏi vùng staged, giữ thay đổi
git revert <mã-commit>         # tạo commit đảo ngược một commit cũ
```
