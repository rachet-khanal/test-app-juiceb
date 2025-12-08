import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  // basePath and assetPrefix are automatically injected by actions/configure-pages in CI
  // For local development with GitHub Pages basePath, set NEXT_PUBLIC_GITHUB_REPO_NAME in .env.production
  images: {
    unoptimized: true,
  },
}

export default nextConfig
