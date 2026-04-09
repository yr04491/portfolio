import { GITHUB_USERNAME, HIDDEN_REPOS } from "@/config/repos";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
};

export type LanguageStat = {
  name: string;
  bytes: number;
  percentage: number;
};

const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };
const FETCH_OPTS = { next: { revalidate: 3600 }, headers: GITHUB_HEADERS };

// 表示するリポジトリ一覧を取得（個人 + 所属組織）
export async function getPinnedRepos(): Promise<Repo[]> {
  // 個人リポジトリ
  const personalRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    FETCH_OPTS
  );
  const personalRepos: Repo[] = personalRes.ok ? await personalRes.json() : [];

  // 所属組織一覧
  const orgsRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/orgs`,
    FETCH_OPTS
  );
  const orgs: { login: string }[] = orgsRes.ok ? await orgsRes.json() : [];

  // 各組織のリポジトリを並列取得
  const orgReposList = await Promise.all(
    orgs.map(async (org) => {
      const res = await fetch(
        `https://api.github.com/orgs/${org.login}/repos?per_page=100&sort=updated`,
        FETCH_OPTS
      );
      return res.ok ? (res.json() as Promise<Repo[]>) : [];
    })
  );
  const orgRepos = orgReposList.flat();

  return [...personalRepos, ...orgRepos].filter(
    (repo) => !repo.fork && !HIDDEN_REPOS.includes(repo.name)
  );
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
