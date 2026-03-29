"use client";

import { useEffect } from "react";

export function useKeySequence(sequence: string, callback: () => void) {
  useEffect(() => {
    let buffer = "";
    let lastTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();

      // 入力フォームなどでは無効化
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      // 500ms以上間が空いたらバッファリセット
      if (now - lastTime > 500) buffer = "";

      buffer += e.key;
      lastTime = now;

      if (buffer.endsWith(sequence)) {
        buffer = "";
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, callback]);
}
