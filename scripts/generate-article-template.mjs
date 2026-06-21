import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const args = parseArgs(process.argv.slice(2));
const title = args.title || '新しい記事タイトル';
const slug = args.slug || slugify(title);
const categoryId = args.category || 'ai-sidejob';
const outPath = join('src', 'content', 'articles', `${slug}.md`);

if (existsSync(outPath)) {
  console.error(`File already exists: ${outPath}`);
  process.exit(1);
}

mkdirSync(dirname(outPath), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const body = `---
title: "${escapeYaml(title)}"
description: "この記事の要約を80〜120文字で書く"
pubDate: "${today}"
categoryId: "${categoryId}"
tags: ["AI副業"]
affiliateDisclosure: true
relatedSlugs: []
---

## 読者の悩み

ここに読者が検索前に抱えている不安、迷い、失敗経験を書く。

## 結論

最初に伝える結論を書く。断定しすぎず、対象者と前提を明確にする。

## 具体的な手順

### 1. 手順タイトル

実際に行うことを書く。

### 2. 手順タイトル

比較、判断基準、一次情報の確認先を書く。

## 注意点

広告表記、公式情報の確認、向いていない人、失敗しやすい点を書く。

## 次に読むべき記事

関連する記事やカテゴリへの導線を書く。
`;

writeFileSync(outPath, body, 'utf8');
console.log(`Created ${outPath}`);

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    result[key] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  return result;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || `article-${Date.now()}`;
}

function escapeYaml(value) {
  return String(value).replaceAll('"', '\\"');
}
