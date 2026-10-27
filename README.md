# Portfolio — 吉田琳汰朗 (Rintaro Yoshida)

福井大学の吉田琳汰朗のポートフォリオサイトです。これまでに制作した Web・モバイルアプリを紹介しています。

公開URL: https://yr04491.vercel.app

## 技術スタック

- Next.js (App Router) / React / TypeScript
- Tailwind CSS
- simple-icons（スキル欄のアイコン）
- Vercel（ホスティング）

## 仕組み

- **作品一覧**は GitHub API から自動で取得しています（個人リポジトリ ＋ 所属組織のリポジトリ）。
- **スキル欄**は、全リポジトリの使用言語を集計して表示しています。
- データは1時間ごとに再取得されます。

## 作品情報の編集

| やりたいこと | 編集するファイル |
| --- | --- |
| 作品名・一言説明・詳細（制作背景、技術ポイントなど）を書く | `src/config/projects.ts` の `PROJECT_DETAILS` |
| 主要作品（Featured）を選ぶ・並べ替える | `src/config/projects.ts` の `FEATURED_REPOS` |
| 一覧に出したくないリポジトリを隠す | `src/config/repos.ts` の `HIDDEN_REPOS` |
| トップの自己紹介文を変える | `src/config/i18n.ts` |
| 検索結果に出るタイトルや説明文を変える | `src/app/layout.tsx` の `metadata` |

`PROJECT_DETAILS` に書いていない項目は、GitHub のリポジトリ説明文が代わりに使われます。

## 隠し機能

ページ上でキーボードの `s` を素早く2回押すと「PLAY MODE」が有効になり、ダークモードと英語表示の切り替えボタンが現れます。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開くと確認できます。
