import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://yr04491.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rintaro Yoshida | Portfolio",
    template: "%s | Rintaro Yoshida",
  },
  description:
    "福井大学在学中のエンジニア、Rintaro Yoshida のポートフォリオです。Web・モバイルアプリ開発を中心に活動しています。",
  keywords: [
    "Rintaro Yoshida",
    "吉田倫太郎",
    "ポートフォリオ",
    "エンジニア",
    "福井大学",
    "Web開発",
    "モバイルアプリ",
    "JavaScript",
    "Dart",
    "Flutter",
  ],
  authors: [{ name: "Rintaro Yoshida", url: BASE_URL }],
  creator: "Rintaro Yoshida",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "Rintaro Yoshida | Portfolio",
    title: "Rintaro Yoshida | Portfolio",
    description:
      "福井大学在学中のエンジニア。Web・モバイルアプリ開発を中心に活動しています。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rintaro Yoshida | Portfolio",
    description:
      "福井大学在学中のエンジニア。Web・モバイルアプリ開発を中心に活動しています。",
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
  name: "Rintaro Yoshida",
  url: BASE_URL,
  sameAs: ["https://github.com/yr04491"],
  jobTitle: "Student Engineer",
  affiliation: {
    "@type": "EducationalOrganization",
    name: "Fukui University",
  },
  description:
    "福井大学在学中のエンジニア。Web・モバイルアプリ開発を中心に活動しています。",
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
        {children}
      </body>
    </html>
  );
}
