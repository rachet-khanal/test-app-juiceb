import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  // const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME
  // const basePath = repoName ? `/${repoName}` : ""

  return {
    name: "Juicebox",
    short_name: "Juicebox",
    description: "Juicebox App",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0D10",
    theme_color: "#0C0D10",
    icons: [
      {
        src: `/images/logo.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
