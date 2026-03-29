import { getLanguageStats } from "@/lib/github";
import * as si from "simple-icons";

const ICON_SLUG_MAP: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Dart: "dart",
  Python: "python",
  HTML: "html5",
  CSS: "css3",
  Shell: "gnubash",
  Ruby: "ruby",
  Go: "go",
  Rust: "rust",
  Java: "java",
  "C#": "csharp",
  "C++": "cplusplus",
  Swift: "swift",
  Kotlin: "kotlin",
  PHP: "php",
  Vue: "vuedotjs",
  React: "react",
  Svelte: "svelte",
};

const CATEGORY_MAP: Record<string, "Frontend" | "Backend" | "Others"> = {
  JavaScript: "Frontend",
  TypeScript: "Frontend",
  HTML: "Frontend",
  CSS: "Frontend",
  Vue: "Frontend",
  React: "Frontend",
  Svelte: "Frontend",
  Python: "Backend",
  Ruby: "Backend",
  Go: "Backend",
  Rust: "Backend",
  Java: "Backend",
  "C#": "Backend",
  "C++": "Backend",
  PHP: "Backend",
  Kotlin: "Backend",
  Dart: "Frontend",
  Swift: "Others",
  Shell: "Others",
};

const CATEGORIES = ["Frontend", "Backend", "Others"] as const;

function getIcon(langName: string): { hex: string; path: string } | null {
  const slug = ICON_SLUG_MAP[langName];
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof si;
  const icon = si[key] as { hex: string; path: string } | undefined;
  return icon ?? null;
}

function IconCard({ name }: { name: string }) {
  const icon = getIcon(name);
  return (
    <div className="flex flex-col items-center gap-2 w-16">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
        {icon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            style={{ fill: `#${icon.hex}` }}
            aria-label={name}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="text-xs font-bold text-neutral-400">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
      <span className="text-xs text-neutral-500 dark:text-neutral-400 text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

export default async function Skills() {
  const languages = await getLanguageStats();

  const grouped: Record<string, string[]> = {
    Frontend: [],
    Backend: [],
    Others: [],
  };

  for (const lang of languages) {
    const category = CATEGORY_MAP[lang.name] ?? "Others";
    grouped[category].push(lang.name);
  }

  const hasAny = languages.length > 0;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-3xl">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-8">
          Skills
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-12">
          Technologies
        </h2>

        {!hasAny ? (
          <p className="text-neutral-400">データ取得中...</p>
        ) : (
          <div className="space-y-10">
            {CATEGORIES.map((category) => {
              const langs = grouped[category];
              if (langs.length === 0) return null;
              return (
                <div key={category}>
                  <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {langs.map((name) => (
                      <IconCard key={name} name={name} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
