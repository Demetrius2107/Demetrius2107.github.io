#!/usr/bin/env bash
# ============================================================
# new-post.sh — 本地新建一篇博文
# 用法:  ./new-post.sh "文章标题"
# 效果:  自动生成带完整 front matter 的 Markdown 文件并打开编辑器
# 模板:  archetypes/posts.md（与 CMS 后台字段保持一致）
# ============================================================
set -euo pipefail

TITLE="${1:-}"
if [ -z "$TITLE" ]; then
  echo "用法: ./new-post.sh \"文章标题\"" >&2
  exit 1
fi

# 生成 slug（中文标题用日期兜底）
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
if [ -z "$SLUG" ]; then
  SLUG="post"
fi
FILENAME="content/posts/${DATE}-${SLUG}.md"

if [ -f "$FILENAME" ]; then
  echo "文件已存在: $FILENAME" >&2
  exit 1
fi

mkdir -p content/posts
cat > "$FILENAME" <<EOF
---
title: ${TITLE}
subtitle:
date: ${DATE}T$(date +%H:%M:%S)+08:00
slug: ${SLUG}
draft: true
author:
  name: Demetrius
  link: /
description:
keywords:
comment: true
weight: 0
tags:
categories:
hiddenFromHomePage: false
hiddenFromSearch: false
hiddenFromRelated: false
hiddenFromFeed: false
summary:
featuredImagePreview:
featuredImage:
password:
message:
repost:
  enable: false
  url:
---

<!--more-->

在这里开始写作……
EOF

echo "✅ 已创建: $FILENAME"
echo "正在打开编辑器……"

# 打开编辑器：优先 $EDITOR，其次常见编辑器
if [ -n "${EDITOR:-}" ]; then
  "$EDITOR" "$FILENAME"
elif command -v code >/dev/null 2>&1; then
  code "$FILENAME"
elif command -v notepad >/dev/null 2>&1; then
  notepad "$(cygpath -w "$FILENAME" 2>/dev/null || echo "$FILENAME")"
else
  echo "未找到编辑器，请手动打开: $FILENAME"
fi
