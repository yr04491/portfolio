"use client";

import { useState } from "react";
import type { Repo } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Dart: "#00b4ab",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#1572b6",
  Ruby: "#cc342d",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  "C#": "#178600",
};

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

function RepoLinks({ repo, size = "sm" }: { repo: Repo; size?: "sm" | "base" }) {
  const cls = `flex items-center gap-1.5 text-${size} text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors`;
  return (
    <div className="flex items-center gap-3 mt-auto">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={cls}>
        <GitHubIcon />
        GitHub
      </a>
      {repo.homepage && (
        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className={cls}>
          <ExternalLinkIcon />
          {(() => {
            const u = new URL(repo.homepage);
            return u.hostname + u.pathname.replace(/\/$/, "") || u.hostname;
          })()}
        </a>
      )}
    </div>
  );
}

/** 一覧カードの表示内容 — 将来的に詳細と差別化する場合はここを変更 */
function CardContent({ repo }: { repo: Repo }) {
  return (
    <>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate mb-2">
        {repo.name}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 flex-1 mb-4">
        {repo.description ?? "説明なし"}
      </p>
      {repo.language && (
        <div className="flex items-center gap-1.5 mb-4">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b" }}
          />
          <span className="text-xs text-neutral-400">{repo.language}</span>
        </div>
      )}
      <RepoLinks repo={repo} />
    </>
  );
}

/** 詳細モーダルの表示内容 — 現在は一覧と同じ、将来ここを拡張 */
function DetailContent({ repo }: { repo: Repo }) {
  return (
    <>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 pr-8">
        {repo.name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
        {repo.description ?? "説明なし"}
      </p>
      {repo.language && (
        <div className="flex items-center gap-1.5 mb-6">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b" }}
          />
          <span className="text-xs text-neutral-400">{repo.language}</span>
        </div>
      )}
      <RepoLinks repo={repo} size="base" />
    </>
  );
}

export default function ProjectCard({ repo }: { repo: Repo }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 一覧カード */}
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col text-left w-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl p-6 hover:shadow-md dark:hover:shadow-neutral-900 transition-shadow cursor-pointer"
      >
        <CardContent repo={repo} />
      </button>

      {/* 詳細モーダル */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              aria-label="閉じる"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <DetailContent repo={repo} />
          </div>
        </div>
      )}
    </>
  );
}
