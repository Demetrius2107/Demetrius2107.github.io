---
title: 基于GitHubPages的Hugo静态博客重新搭建过程记录
subtitle:
date: 2026-03-31T09:24:59+08:00
slug: 14eb665
draft: false
author:
  name:
  link:
  email:
  avatar:
description: "重新搭建基于 GitHub Pages 的 Hugo 静态博客全过程"
keywords:
comment: false
weight: 0
tags:
  - Hugo
  - GitHub Pages
  - 博客重建
categories:
  - 随笔
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

# See details front matter: https://fixit.lruihao.cn/documentation/content-management/introduction/#front-matter
---

<!--more-->

## 为什么要去重建博客
有价值的技术性总结，这是唯一的原因，之前的几次面试中提问才意识到自己平时总结的干货太少，或者说就是没有，长文本输出能力也是需要学习的，于是重新启用博客，计划是目前一周至少写两篇有价值的博客，不是在yuque中复制粘贴一点别人的url放在那里也不去看，于是有了本次的重启行动。
时间总体是从26号到31号，四个工作日，中间磕磕绊绊，踩了不少坑。
原有博客过于简略，使用的Hugo风格简单不够美观，遂尝试再次构建。本次搭建过程采用的思路是先使用Github Pages提供的部署构建 页面还是采用现成的Hugo 主题，本来打算迁移部署到Netlify上，再使用一个Decap CMS作为后台文本系统，然在操作过程中发现目前存在种种问题，暂时搁浅。之后的目标是迁移到Netlify 和 Decap CMS上作为中期阶段，同时开始写自己的后台管理系统，重新使用React优化前端展示效果。
写于2026年3月31日