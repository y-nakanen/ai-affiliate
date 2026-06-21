const args = parseArgs(process.argv.slice(2));
const title = args.title || '記事タイトル';
const summary = args.summary || '記事の要約をここに入れる';

const posts = [
  {
    type: '問題提起',
    body: `「${title}」を公開予定。${summary} 最初に考えるべきなのは、商品リンクより導線の設計です。`
  },
  {
    type: '結論先出し',
    body: `AI副業で迷ったら、まずは読者、記事、SNS、無料テンプレ、LINEの流れを1枚に整理する。${title} で具体化します。`
  },
  {
    type: '手順',
    body: `やることは多く見えますが、順番はシンプルです。1 読者を決める、2 記事を書く、3 SNSで入口を作る、4 無料テンプレへつなぐ。`
  },
  {
    type: '注意喚起',
    body: `「必ず稼げる」より、「どんな前提なら試す価値があるか」を書く方が信頼されやすい。広告表記も最初から型に入れておきます。`
  },
  {
    type: '導線',
    body: `記事、X、Shorts、LINEを別々に作ると続きにくい。1つの記事から投稿案と台本を作れる形にして、運用を軽くします。`
  }
];

console.log(`# X投稿案: ${title}\n`);
console.log(`要約: ${summary}\n`);
posts.forEach((post, index) => {
  console.log(`## ${index + 1}. ${post.type}`);
  console.log(post.body);
  console.log('');
});

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
