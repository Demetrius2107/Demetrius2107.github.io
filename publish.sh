#!/usr/bin/env bash
# ============================================================
# publish.sh — 一键提交并推送（GitHub Actions 自动构建部署）
# 用法:  ./publish.sh "提交说明"       可选，默认 "post: update"
# 效果:  git add -A && git commit && git push origin main
# ============================================================
set -euo pipefail

MSG="${1:-post: update}"
BRANCH="${2:-main}"

echo "🚀 正在提交并推送 (branch: $BRANCH)……"
git add -A
git commit -m "$MSG"
git push origin "$BRANCH"

echo "✅ 推送完成！GitHub Actions 将自动构建并部署。"
echo "   稍后访问 https://demetrius2107.github.io 查看效果"
