import { GITHUB_USERNAME, PINNED_REPOS } from "@/config/repos";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

export type LanguageStat = {
  name: string;
  bytes: number;
  percentage: number;
};

// 表示するリポジトリ一覧を取得
export async function getPinnedRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      next: { revalidate: 3600 }, // 1時間ごとに再取得
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) return [];

  const allRepos: Repo[] = await res.json();
  return allRepos.filter((repo) => PINNED_REPOS.includes(repo.name));
}

// 全リポジトリから使用言語を集計して取得
export async function getLanguageStats(): Promise<LanguageStat[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
    {
      next: { revalidate: 3600 }, // 1時間ごとに再取得
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) return [];

  const repos: Repo[] = await res.json();

  // 各リポジトリの言語情報を並列で取得
  const languageResults = await Promise.all(
    repos
      .filter((repo) => !repo.name.includes("fork"))
      .map(async (repo) => {
        const langRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
          {
            next: { revalidate: 3600 },
            headers: { Accept: "application/vnd.github+json" },
          }
        );
        if (!langRes.ok) return {};
        return langRes.json() as Promise<Record<string, number>>;
      })
  );

  // 言語ごとのバイト数を合計
  const totals: Record<string, number> = {};
  for (const langMap of languageResults) {
    for (const [lang, bytes] of Object.entries(langMap)) {
      totals[lang] = (totals[lang] ?? 0) + bytes;
    }
  }

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);
  if (totalBytes === 0) return [];

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8); // 上位8言語まで表示
}
