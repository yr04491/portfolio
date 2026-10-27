import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PlayModeProvider } from "@/context/PlayModeContext";
import PlayModeAnnouncement from "@/components/PlayModeAnnouncement";
import PlayModeControls from "@/components/PlayModeControls";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://yr04491.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "吉田琳汰朗 | Rintaro Yoshida Portfolio",
    template: "%s | 吉田琳汰朗",
  },
  description:
    "福井大学の吉田琳汰朗（Rintaro Yoshida）のポートフォリオサイトです。Web・モバイルアプリ開発を中心に、これまでに制作した作品を紹介しています。",
  keywords: [
    "Rintaro Yoshida",
    "吉田琳汰朗",
    "よしだりんたろう",
    "福井大学",
    "Fukui University",
    "ポートフォリオ",
    "学生",
    "エンジニア志望",
    "Web開発",
    "モバイルアプリ",
    "JavaScript",
    "Dart",
    "Flutter",
  ],
  authors: [{ name: "吉田琳汰朗 (Rintaro Yoshida)", url: BASE_URL }],
  creator: "Rintaro Yoshida",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "吉田琳汰朗 | Rintaro Yoshida Portfolio",
    title: "吉田琳汰朗 | Rintaro Yoshida Portfolio",
    description:
      "福井大学の吉田琳汰朗（Rintaro Yoshida）のポートフォリオ。Web・モバイルアプリ開発を中心に活動しています。",
  },
  twitter: {
    card: "summary_large_image",
    title: "吉田琳汰朗 | Rintaro Yoshida Portfolio",
    description:
      "福井大学の吉田琳汰朗（Rintaro Yoshida）のポートフォリオ。Web・モバイルアプリ開発を中心に活動しています。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "vU-gWwkDRxx1vDE7OJlPI5bqgsIWsIHB606fDq6pqKA",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "吉田琳汰朗",
  alternateName: ["Rintaro Yoshida", "よしだりんたろう"],
  url: BASE_URL,
  sameAs: ["https://github.com/yr04491"],
  jobTitle: "Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "福井大学",
    alternateName: "University of Fukui",
  },
  description: "福井大学の吉田琳汰朗（Rintaro Yoshida）のポートフォリオ。Web・モバイルアプリ開発を中心に活動しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PlayModeProvider>
          <PlayModeAnnouncement />
          <PlayModeControls />
          {children}
        </PlayModeProvider>
      </body>
    </html>
  );
}
