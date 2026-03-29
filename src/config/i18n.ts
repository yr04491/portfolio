export const translations = {
  ja: {
    hero: {
      label: "Portfolio",
      description:
        "Fukui University で学ぶエンジニア。\nWeb・モバイルアプリを中心に開発しています。",
      scroll: "Scroll to explore",
    },
  },
  en: {
    hero: {
      label: "Portfolio",
      description:
        "Engineer studying at Fukui University.\nBuilding web & mobile apps.",
      scroll: "Scroll to explore",
    },
  },
} as const;

export type Lang = keyof typeof translations;
