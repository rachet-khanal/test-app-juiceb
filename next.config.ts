import type { NextConfig } from "next"

const repoName = "test-app-juiceb"

// Set this only when building for GitHub Pages
const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true"

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
