import type { NextConfig } from "next"

// Get repo name from environment variable
const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME

// Determine if we're building for GitHub Pages based on whether repo name exists
const isGitHubPages = !!repoName

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
