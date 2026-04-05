import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 本地字体配置
// 1. 英文优先：Arima - 优雅的展示字体
const arima = localFont({
  src: "../../public/fonts/Arima.ttf",
  variable: "--font-arima",
  display: "swap",
});

// 2. 中文首选：霞鹜文楷 Mono - 开源中文字体，适合正文阅读
const lxgwWenKaiMono = localFont({
  src: "../../public/fonts/LXGWWenKaiMono.ttf",
  variable: "--font-lxgw-wenkai-mono",
  display: "swap",
});

// 3. 中文备选：仓耳今楷 - 优雅的楷书风格
const cangErJinKai = localFont({
  src: "../../public/fonts/CangErJinKai03.ttf",
  variable: "--font-cang-er-jinkai",
  display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${arima.variable} ${lxgwWenKaiMono.variable} ${cangErJinKai.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
