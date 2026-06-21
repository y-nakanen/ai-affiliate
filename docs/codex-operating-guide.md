# Codex運用ガイド

このドキュメントは、今後Codexがサイト更新・記事追加・導線改善を行うときの最初の参照先です。

## 最初に読むファイル

1. `README.md`
2. `docs/business-concept.md`
3. `docs/content-guideline.md`
4. `docs/affiliate-guideline.md`
5. `src/consts.ts`
6. `src/data/products.json`
7. `src/data/services.json`

## サイトの優先順位

1. SNSプロフィールから来た人が `/start/` で迷わないこと
2. 広告・PR表記が分かりやすいこと
3. 商品紹介よりも信頼と判断材料を優先すること
4. 無料テンプレとLINE導線を後から差し込みやすいこと
5. 案件相談へ自然につながること

## データ契約

### 商品カード

`src/data/products.json` に1件追加すれば、`pageGroups` に応じてカードが表示されます。

- `primaryCategoryId`: メインカテゴリ
- `categoryIds`: 関連カテゴリ
- `pageGroups`: 表示ページ。`tools`、`gadgets`、`skills`、`sidejob`
- `recommendedFor`: カードの「対象」
- `caution`: カードの「注意点」
- `programId`: `affiliatePrograms.json` の `id`
- `priority`: 表示順

### 相談メニュー

`src/data/services.json` に1件追加すれば、`services` ページにカードが表示されます。

- `target`: 対象者
- `scope`: 相談できること
- `deliverable`: 支援・納品イメージ
- `status`: 準備中、受付中など

## 禁止・注意表現

- 必ず稼げる
- 誰でも稼げる
- 放置で収益化
- ノーリスク
- 実際に使っていない商品を利用済みのように見せる表現
- 公式情報を確認せずに価格・条件・キャンペーンを断定する表現

## 実装後チェック

```bash
npm.cmd run build
npm.cmd run validate:affiliate
```

スマホ幅で `/start/`、`/tools/`、`/services/`、記事詳細を確認します。横スクロール、カードの文字詰まり、CTAの過多、広告表記の見落としを重点的に見ます。
