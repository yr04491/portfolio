"use client";

import { GITHUB_USERNAME } from "@/config/repos";
import { translations } from "@/config/i18n";
import { usePlayMode } from "@/context/PlayModeContext";

export default function Hero() {
  const { isEnglish } = usePlayMode();
  const t = isEnglish ? translations.en.hero : translations.ja.hero;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl">
        <p className="text-sm tracking-widest text-neutral-400 uppercase mb-4">
          {t.label}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
          Rintaro
          <br />
          Yoshida
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed whitespace-pre-line">
          {t.description}
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors border-b border-neutral-300 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-white pb-0.5"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">→</span>
          <span className="text-sm text-neutral-400">{t.scroll}</span>
        </div>
      </div>
    </section>
  );
}
