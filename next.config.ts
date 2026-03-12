import type { NextConfig } from 'next'

const isGitHubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPagesBuild ? '/kcddental' : '',
  assetPrefix: isGitHubPagesBuild ? '/kcddental/' : undefined,
}

export default nextConfig
