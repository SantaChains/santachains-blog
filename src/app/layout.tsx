import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SantaChains - 川端康成风格的个人博客",
  description: "在雪国的寂静中，用文字捕捉那些稍纵即逝的美丽瞬间。SantaChains的个人空间，充满川端康成文学美学的数字花园。",
  keywords: ["川端康成", "雪国", "日本文学", "个人博客", "美学", "SantaChains"],
  authors: [{ name: "SantaChains" }],
  openGraph: {
    title: "SantaChains - 川端康成风格的个人博客",
    description: "在雪国的寂静中，用文字捕捉那些稍纵即逝的美丽瞬间",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
