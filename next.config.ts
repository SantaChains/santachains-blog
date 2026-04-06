import type { NextConfig } from "next";

// GitHub Actions 构建时设置 basePath，本地开发不设置
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubActions ? '/santachains-blog' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
