import { getPinnedRepos } from "@/lib/github";

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

export default async function Projects() {
  const repos = await getPinnedRepos();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-3xl">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-8">
          Works
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-12">
          Projects
        </h2>

        {repos.length === 0 ? (
          <p className="text-neutral-400">プロジェクトを読み込み中...</p>
        ) : (
          <div className="grid gap-px bg-neutral-100 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 rounded-lg overflow-hidden">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-neutral-900 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors truncate">
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div className="mt-3 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              LANGUAGE_COLORS[repo.language] ?? "#8b8b8b",
                          }}
                        />
                        <span className="text-xs text-neutral-400">
                          {repo.language}
                        </span>
                      </div>
                    )}
                  </div>
                  <svg
                    className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
