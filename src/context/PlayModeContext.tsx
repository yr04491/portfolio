"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type PlayModeContextType = {
  isPlayMode: boolean;
  isDark: boolean;
  isEnglish: boolean;
  toggleDark: () => void;
  toggleEnglish: () => void;
  activate: () => void;
};

const PlayModeContext = createContext<PlayModeContextType>({
  isPlayMode: false,
  isDark: false,
  isEnglish: false,
  toggleDark: () => {},
  toggleEnglish: () => {},
  activate: () => {},
});

export function PlayModeProvider({ children }: { children: ReactNode }) {
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const activate = useCallback(() => {
    if (!isPlayMode) setIsPlayMode(true);
  }, [isPlayMode]);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const toggleEnglish = useCallback(() => {
    setIsEnglish((prev) => !prev);
  }, []);

  // リロードで初期化（stateはデフォルトでリロード時にリセットされる）
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <PlayModeContext.Provider
      value={{ isPlayMode, isDark, isEnglish, toggleDark, toggleEnglish, activate }}
    >
      {children}
    </PlayModeContext.Provider>
  );
}

export function usePlayMode() {
  return useContext(PlayModeContext);
}
