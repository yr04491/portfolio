export type ProjectDetail = {
  description?: string;
  background?: string;
  techPoints?: string[];
  usage?: string;
  screenshots?: string[];
};

// リポジトリ名をキーに手動入力データを管理
// 未定義 or 空オブジェクトのリポジトリは詳細モーダルで該当項目を非表示
export const PROJECT_DETAILS: Record<string, Partial<ProjectDetail>> = {
  Com_Page: {
    description: "Next.js App Router と GitHub API を使って作ったポートフォリオサイト。",
    background: "自分の制作物をまとめて見せる場所が欲しくて制作しました。",
    techPoints: ["Next.js App Router", "GitHub API連携", "Tailwind CSS", "ダークモード対応"],
    usage: "トップページからプロジェクト一覧・スキルを確認できます。",
  },

  // 空白サンプル（非表示テスト用）
  "empty-sample": {},

  // ── 追加サンプル ──────────────────────────────────────────
  // "repo-name": {
  //   title: "プロジェクトタイトル",
  //   description: "プロジェクトの説明。",
  //   background: "制作背景・コメント。",
  //   techPoints: ["技術1", "技術2"],
  //   usage: "簡単な使い方。",
  //   screenshots: ["/images/screenshot.png"],
  // },
};
