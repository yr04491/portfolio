"use client";

import { usePlayMode } from "@/context/PlayModeContext";

export default function PlayModeControls() {
  const { isPlayMode, isDark, isEnglish, toggleDark, toggleEnglish } =
    usePlayMode();

  if (!isPlayMode) return null;

  return (
    <div className="fixed top-5 right-6 z-40 flex items-center gap-2">
      {/* 言語切替ボタン */}
      <button
        onClick={toggleEnglish}
        title={isEnglish ? "日本語に切替" : "Switch to English"}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all text-xs font-bold tracking-tight shadow-sm"
      >
        {isEnglish ? "JP" : "EN"}
      </button>

      {/* ダークモード切替ボタン */}
      <button
        onClick={toggleDark}
        title={isDark ? "ライトモードに切替" : "ダークモードに切替"}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm"
      >
        {isDark ? (
          // 太陽アイコン
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          // 月アイコン
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
