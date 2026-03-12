import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteHeader } from '@/components/layout/site-header'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { absoluteSiteUrl, SITE_NAME, SITE_ORIGIN } from '@/lib/format'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} — KCD 치과 코드 레퍼런스`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'KCD 치과 코드의 공식 원문 추출 데이터와 검증된 보강 정보를 분리해 제공하는 정적 reference platform입니다.',
  alternates: {
    canonical: absoluteSiteUrl('/'),
  },
  openGraph: {
    title: `${SITE_NAME} — KCD 치과 코드 레퍼런스`,
    description:
      '공식 KCD 원문, 검색, 비교, 인쇄, 학습 도구를 제공하는 정적 치과 KCD reference platform입니다.',
    url: absoluteSiteUrl('/'),
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans text-brand-text antialiased">
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <footer className="print-hidden border-t border-slate-200/70 px-4 py-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              Official extracted data comes from legacy/index.html / kcdRawData. Verified enrichment, claim, and drug data are intentionally sparse until source-backed entries are added.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
