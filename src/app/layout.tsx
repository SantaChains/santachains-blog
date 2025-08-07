import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 使用系统字体优雅替换Noto Serif JP，保持变量名不变
const notoSerifJP = {
  variable: "--font-noto-serif-jp",
  // 通过CSS变量在全局样式中定义系统字体回退
};

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
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
