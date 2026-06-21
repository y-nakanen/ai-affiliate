# AI副業キャンパス

会社員・若手エンジニア向けに、AI副業、アフィリエイト、SNS発信、GAS/Codex自動化を学ぶ実践メディアです。

## ローカル起動

```bash
npm.cmd install
npm.cmd run dev
```

PowerShellで `npm` が実行ポリシーに止められる場合は、上記のように `npm.cmd` を使います。

## ビルド

```bash
npm.cmd run build
npm.cmd run preview
```

## GitHub Pagesへのデプロイ

1. GitHubにこのリポジトリをpushします。
2. Repository settings > Pages を開きます。
3. Sourceを `GitHub Actions` にします。
4. `main` ブランチへpushすると `.github/workflows/deploy.yml` が `dist/` を公開します。

Astroの `base` はGitHub Actions環境からリポジトリ名を見て自動設定します。独自ドメインを使う場合は、Actionsの環境変数 `SITE_URL` に公開URLを入れてください。

## 記事の追加方法

テンプレート生成:

```bash
npm.cmd run generate:article -- --title "記事タイトル" --slug "article-slug"
```

生成された `src/content/articles/article-slug.md` のfrontmatterと本文を編集します。記事には、読者の悩み、結論、具体的な手順、注意点、次に読む記事への導線を入れてください。

## 記事からSNS・動画・LINE案を作る方法

記事情報JSONを用意すると、X投稿案、Shorts台本、Instagramカルーセル構成、LINE配信文をテンプレート生成できます。実際のAI APIは使わず、運用のたたき台をMarkdownで出力します。

入力例:

```json
{
  "title": "AI時代のアフィリエイトは何から始めるべきか",
  "category": "AI副業",
  "summary": "AI、SNS、GitHub Pages、LINEを使ってアフィリエイト導線を作る方法を解説する記事",
  "target": "AIで副業を始めたい会社員",
  "cta": "詳しくはプロフィールのリンクから",
  "includesPr": true,
  "disclosureNote": "広告・PRを含む場合があります。"
}
```

実行:

```bash
npm.cmd run repurpose:content -- --input tmp/article-input.json
```

保存したい場合:

```bash
npm.cmd run repurpose:content -- --input tmp/article-input.json > outputs/article-repurpose.md
```

出力内容:

- X投稿案5本
- TikTok/YouTube Shorts用の動画台本2本
- Instagramカルーセル構成1本
- LINE配信用の短文1本
- 広告・PR表記候補

`includesPr` が `true` の場合、各媒体で使える広告・PR表記候補も出力します。商品・サービス紹介やアフィリエイトリンクを含める場合は、広告であることが分かる表記を入れてください。

## SEOとOGPの編集方法

各ページの `<BaseLayout>` に `title` と `description` を設定します。

```astro
<BaseLayout
  title="ページタイトル"
  description="検索結果やSNSシェアに表示したい説明文"
>
```

共通OGP画像は `public/images/ogp/hero-ai-sidejob-campus.png` です。ページ別画像を追加する場合は、`ogImage="/images/ogp/example.png"` を渡します。記事ページはMarkdown frontmatterの `title` と `description` が使われます。

## products.jsonの編集方法

商品・サービスは `src/data/products.json` で管理します。

- `affiliateUrl` はASP審査後に差し替えます。
- `isAffiliate` が `true` の商品は広告表記を前提にします。
- 使っていない商品は `experienceStatus` を `紹介候補` や `調査中` にし、利用済みのような表現を避けます。
- `primaryCategoryId`、`categoryIds`、`pageGroups` で表示場所を決めます。
- `recommendedFor` と `caution` は商品カードに表示されます。
- `programId` は `src/data/affiliatePrograms.json` の `id` と一致させます。

商品カードを増やす最小手順:

1. `src/data/products.json` に商品を1件追加します。
2. 必要なら `src/data/affiliatePrograms.json` にASP情報を追加します。
3. `pageGroups` に `tools`、`gadgets`、`skills`、`sidejob` のいずれかを入れます。
4. `npm.cmd run validate:affiliate` で警告を確認します。

## LINE・Googleフォーム・SNSの設定

`src/consts.ts` を編集します。

- `LINE_URL`: LINE登録URL。空なら準備中表示です。
- `CONTACT_FORM_URL`: GoogleフォームURL。空なら準備中表示です。

SNSリンクは `src/data/socialLinks.json` の `url` を設定します。空なら準備中表示です。

## 相談メニューの編集方法

相談メニューは `src/data/services.json` で管理します。

- `name`: メニュー名
- `target`: 対象者
- `scope`: 相談できること
- `deliverable`: 支援・納品イメージ
- `status`: 準備中、受付中など
- `priority`: 表示順

確認:

```bash
npm.cmd run validate:affiliate
npm.cmd run validate:affiliate -- --strict
```

## 公開前チェック

```bash
npm.cmd run build
npm.cmd run validate:affiliate
```

確認するページ:

- `/`
- `/start/`
- `/articles/`
- `/tools/`
- `/gadgets/`
- `/skills/`
- `/sidejob/`
- `/templates/`
- `/services/`
- `/ad-policy/`
- `/privacy-policy/`

## 今後の改善予定

- LINE登録URL、SNSリンクの設定
- OGP画像とカテゴリ別画像の追加
- ASP審査後のアフィリエイトURL差し替え
- 記事、X投稿、Shorts台本の運用テンプレート強化
- Google Analytics、Search Console、AdSense導入時のポリシー更新

## Codexで作業するときの参照順

1. `docs/codex-operating-guide.md`
2. `docs/business-concept.md`
3. `docs/content-guideline.md`
4. `docs/affiliate-guideline.md`
5. `docs/roadmap.md`
