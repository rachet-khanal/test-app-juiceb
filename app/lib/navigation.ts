/**
 * Navigation utility to handle basePath for GitHub Pages deployment
 */

const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME
const basePath = repoName ? `/${repoName}` : ""

/**
 * Normalizes a route to work with GitHub Pages basePath
 * @param route - The route to normalize (e.g., "/", "/tutorial")
 * @returns The normalized route with basePath if needed
 */
export function normalizeRoute(route: string): string {
  // If there's no basePath, return as-is
  if (!basePath) {
    return route
  }

  // If route is root "/", return basePath or "/" (for non-GitHub Pages)
  if (route === "/") {
    return basePath || "/"
  }

  // For other routes, ensure they don't duplicate the basePath
  if (route.startsWith(basePath)) {
    return route
  }

  return `${basePath}${route}`
}

/**
 * Gets the basePath value (useful for debugging or conditional rendering)
 */
export function getBasePath(): string {
  return basePath
}
