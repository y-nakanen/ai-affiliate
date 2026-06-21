const args = parseArgs(process.argv.slice(2));
const title = args.title || '記事タイトル';
const summary = args.summary || '記事の要約をここに入れる';

const script = `# Shorts/TikTok台本テンプレ

## 元記事
${title}

## 要約
${summary}

## 0〜3秒: フック
AI副業を始める前に、商品リンクより先に決めることがあります。

## 4〜15秒: 問題
記事、SNS、LINE、商品紹介をバラバラに作ると、投稿しても収益導線が弱くなりがちです。

## 16〜35秒: 解決
まずは、誰に届けるか、何を無料で渡すか、どの記事に戻すかを1枚で整理します。

## 36〜50秒: 具体例
たとえば、記事からX投稿を作り、無料テンプレ準備中ページへ誘導し、LINE登録に接続します。

## 51〜60秒: CTA
詳しい手順は記事でまとめています。プロフィールのリンクから確認してください。
`;

console.log(script);

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
