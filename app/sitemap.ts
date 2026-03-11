import type { MetadataRoute } from 'next'

import { flowchartData } from '@/lib/data/flowcharts'
import { officialKcdData } from '@/lib/data/official-kcd'
import { primaryCategoryMeta } from '@/lib/data/category-meta'
import { absoluteSiteUrl } from '@/lib/format'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/search', '/compare', '/claim', '/quiz', '/diff'].map((route) => ({
    url: absoluteSiteUrl(route),
  }))

  const categoryRoutes = primaryCategoryMeta.map((meta) => ({
    url: absoluteSiteUrl(`/category/${meta.slug}`),
  }))

  const codeRoutes = officialKcdData.flatMap((entry) => [
    { url: absoluteSiteUrl(`/disease/${encodeURIComponent(entry.code)}`) },
    { url: absoluteSiteUrl(`/claim/${encodeURIComponent(entry.code)}`) },
    { url: absoluteSiteUrl(`/print/${encodeURIComponent(entry.code)}`) },
  ])

  const flowRoutes = Object.keys(flowchartData).map((code) => ({
    url: absoluteSiteUrl(`/flowchart/${encodeURIComponent(code)}`),
  }))

  return [...staticRoutes, ...categoryRoutes, ...codeRoutes, ...flowRoutes]
}