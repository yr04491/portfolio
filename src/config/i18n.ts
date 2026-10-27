export const translations = {
  ja: {
    hero: {
      label: "Portfolio",
      nameJa: "吉田 琳汰朗",
      description:
        "福井大学で学ぶエンジニア志望の学生。\nWeb・モバイルアプリを中心に開発しています。",
      scroll: "Scroll to explore",
    },
  },
  en: {
    hero: {
      label: "Portfolio",
      nameJa: "吉田 琳汰朗",
      description:
        "Engineering student at the University of Fukui.\nBuilding web & mobile apps.",
      scroll: "Scroll to explore",
    },
  },
} as const;

export type Lang = keyof typeof translations;
