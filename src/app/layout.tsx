import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rintaro Yoshida | Portfolio",
  description:
    "Rintaro Yoshida のポートフォリオサイト。Web・モバイルアプリ開発を中心に活動しています。",
  openGraph: {
    title: "Rintaro Yoshida | Portfolio",
    description: "Web・モバイルアプリ開発を中心に活動しています。",
    url: "https://yr04491.vercel.app",
    siteName: "Rintaro Yoshida",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
