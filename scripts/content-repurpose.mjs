import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = parseArgs(process.argv.slice(2));

try {
  const input = loadInput(args.input);
  validateInput(input);
  console.log(renderMarkdown(input));
} catch (error) {
  console.error(error.message);
  console.error('');
  console.error(usage());
  process.exit(1);
}

function loadInput(inputPath) {
  if (!inputPath) {
    throw new Error('Error: --input に記事情報JSONファイルを指定してください。');
  }

  const fullPath = resolve(inputPath);

  if (!existsSync(fullPath)) {
    throw new Error(`Error: input file not found: ${fullPath}`);
  }

  try {
    return JSON.parse(readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, ''));
  } catch (error) {
    throw new Error(`Error: JSONを読み込めませんでした。${error.message}`);
  }
}

function validateInput(input) {
  const required = ['title', 'category', 'summary', 'target', 'cta'];
  const missing = required.filter((key) => !isNonEmptyString(input[key]));

  if (missing.length > 0) {
    throw new Error(`Error: 必須項目が不足しています: ${missing.join(', ')}`);
  }
}

function renderMarkdown(input) {
  const data = normalizeInput(input);
  const sections = [
    renderSummary(data),
    renderXPosts(data),
    renderVideoScripts(data),
    renderInstagramCarousel(data),
    renderLineMessage(data),
    renderDisclosure(data)
  ];

  return sections.join('\n\n');
}

function renderSummary(data) {
  return `# 記事再利用コンテンツ案

## 記事情報

- タイトル: ${data.title}
- カテゴリ: ${data.category}
- 想定読者: ${data.target}
- 要約: ${data.summary}
- CTA: ${data.cta}`;
}

function renderXPosts(data) {
  const posts = [
    {
      label: '問題提起',
      body: `${data.target}がつまずきやすいのは、最初から商品リンクや投稿数を増やそうとすることです。\n\n「${data.title}」では、${data.summary}。\n\nまずは導線を小さく整理するところから始めます。\n${data.cta}`
    },
    {
      label: '結論',
      body: `AI副業やアフィリエイトは、いきなり大きく作るより「記事→SNS→無料テンプレ→LINE」の流れを決める方が続けやすいです。\n\n今回の記事では、${data.category}の視点で、最初に整えるポイントをまとめました。\n${data.cta}`
    },
    {
      label: '手順',
      body: `最初にやることはこの順番です。\n\n1. 誰に届けるか決める\n2. 悩みを1つ選ぶ\n3. 記事で整理する\n4. SNSで入口を作る\n5. CTAを1つに絞る\n\n「${data.title}」で具体例をまとめています。\n${data.cta}`
    },
    {
      label: '失敗例',
      body: `過去にブログやアフィリエイトが続かなかった人ほど、最初から完璧なサイトを作ろうとしがちです。\n\nでも大事なのは、読者の悩み、記事、SNS、次の行動をつなげること。\n\n${data.summary}。\n${data.cta}`
    },
    {
      label: 'CTA',
      body: `${data.target}向けに、「${data.title}」をまとめました。\n\n派手な話ではなく、AI、SNS、サイト、LINEをどう組み合わせるかを整理する内容です。\n\nあとから見返せるように、まずは導線の全体像だけでも確認してみてください。\n${data.cta}`
    }
  ];

  return `## X投稿案5本

${posts
  .map(
    (post, index) => `### ${index + 1}. ${post.label}

${post.body}`
  )
  .join('\n\n')}`;
}

function renderVideoScripts(data) {
  const scripts = [
    {
      title: '導線整理型',
      hook: 'AI副業を始める前に、商品リンクより先に決めることがあります。',
      scene: '画面録画で、記事タイトル、簡単な導線メモ、チェックリストを順番に見せる。',
      body: [
        'まず、誰に届けるかを1人に絞ります。',
        '次に、その人が最初に困っていることを記事にします。',
        '最後に、SNS投稿とCTAを1つの流れにします。'
      ],
      failure: '投稿だけ増やして、読者の次の行動が決まっていないと、反応を見ても改善しにくくなります。'
    },
    {
      title: '失敗回避型',
      hook: 'ブログやアフィリエイトで一度止まった人ほど、最初に作り込みすぎない方がいいです。',
      scene: '手元のノート、Notion風の箇条書き、サイト画面のスクロールで構成する。',
      body: [
        `${data.category}で最初に見るべきなのは、収益額より導線です。`,
        '記事、SNS、無料テンプレ、LINEの役割を分けます。',
        '1本の記事から投稿案とLINE文まで作れる形にすると、運用が軽くなります。'
      ],
      failure: '商品紹介だけを先に作ると、読者の悩みとズレやすいです。'
    }
  ];

  return `## TikTok/YouTube Shorts台本2本

${scripts
  .map(
    (script, index) => `### ${index + 1}. ${script.title}

- 想定尺: 45〜60秒
- 顔出し: なし
- 画面案: ${script.scene}

#### 0〜3秒: フック
${script.hook}

#### 4〜20秒: 悩み
${data.target}は、何から始めるか分からず、記事・SNS・商品紹介をバラバラに作りがちです。

#### 21〜45秒: 手順
${script.body.map((line, bodyIndex) => `${bodyIndex + 1}. ${line}`).join('\n')}

#### 46〜55秒: 失敗例
${script.failure}

#### 56〜60秒: CTA
${data.cta}`
  )
  .join('\n\n')}`;
}

function renderInstagramCarousel(data) {
  const slides = [
    `1枚目: ${data.title}`,
    `2枚目: ${data.target}が最初に迷いやすいこと`,
    `3枚目: いきなり商品リンクを増やす前に、読者の悩みを1つに絞る`,
    `4枚目: 記事、SNS、無料テンプレ、LINEの役割を分ける`,
    `5枚目: 失敗例は、投稿数だけ増えて次の行動が決まっていない状態`,
    `6枚目: ${data.summary}`,
    `7枚目: ${data.cta}`
  ];

  return `## Instagramカルーセル構成1本

### テーマ
${data.category}を始める前に、導線を1枚で整理する

### スライド構成
${slides.map((slide) => `- ${slide}`).join('\n')}

### キャプション案
${data.target}向けに、${data.category}の始め方を整理しました。

ポイントは、最初から全部作ろうとしないことです。記事、SNS、無料テンプレ、LINEの役割を分けると、次に改善する場所が見えやすくなります。

${data.cta}`;
}

function renderLineMessage(data) {
  return `## LINE配信文1本

${data.target}向けに、新しい記事をまとめました。

今回のテーマは「${data.title}」です。

${data.summary}。

最初から大きく作るより、読者の悩み、記事、SNS、CTAを小さくつなげる方が続けやすいです。

${data.cta}`;
}

function renderDisclosure(data) {
  if (data.includesPr) {
    const note =
      data.disclosureNote ||
      '広告・PRを含む場合があります。紹介内容は公式情報を確認し、利用実態と異なる表現を避けます。';

    return `## 広告・PR表記候補

- 記事/ブログ: ${note}
- X: 広告・PRを含む場合があります。詳細は記事内で確認してください。
- TikTok/Shorts: 画面内または説明欄に「広告・PRを含む場合があります」と明記。
- Instagram: キャプション冒頭または末尾に「広告・PRを含む場合があります」と明記。
- LINE: 商品・サービス紹介を含む場合は、本文中に「広告・PRを含む場合があります」と入れる。`;
  }

  return `## 広告・PR表記メモ

今回の入力では \`includesPr\` が指定されていません。商品・サービス紹介やアフィリエイトリンクを含める場合は、入力JSONに \`"includesPr": true\` を追加し、各媒体で広告・PR表記を入れてください。`;
}

function normalizeInput(input) {
  return {
    title: input.title.trim(),
    category: input.category.trim(),
    summary: input.summary.trim(),
    target: input.target.trim(),
    cta: input.cta.trim(),
    includesPr: Boolean(input.includesPr),
    disclosureNote: isNonEmptyString(input.disclosureNote) ? input.disclosureNote.trim() : ''
  };
}

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

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function usage() {
  return `Usage:
  npm.cmd run repurpose:content -- --input tmp/article-input.json

Input JSON example:
{
  "title": "AI時代のアフィリエイトは何から始めるべきか",
  "category": "AI副業",
  "summary": "AI、SNS、GitHub Pages、LINEを使ってアフィリエイト導線を作る方法を解説する記事",
  "target": "AIで副業を始めたい会社員",
  "cta": "詳しくはプロフィールのリンクから",
  "includesPr": true,
  "disclosureNote": "広告・PRを含む場合があります。"
}`;
}
