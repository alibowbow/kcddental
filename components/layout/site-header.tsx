import Link from 'next/link'

import { SearchCombobox } from '@/components/ui/search-combobox'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function SiteHeader() {
  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <Link href="/" className="block text-sm font-bold tracking-[0.16em] text-brand-primary">
            KCD DENTAL REFERENCE
          </Link>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            공식 원문 추출 + 검증된 보강 데이터 분리 + 정적 배포
          </p>
        </div>
        <div className="hidden max-w-xl flex-[2] lg:block">
          <SearchCombobox className="w-full" searchPageFallback="/search" />
        </div>
        <nav className="hidden items-center gap-3 text-sm text-slate-600 md:flex dark:text-slate-300">
          <Link href="/compare" className="hover:text-brand-primary">Compare</Link>
          <Link href="/claim" className="hover:text-brand-primary">Claim</Link>
          <Link href="/quiz" className="hover:text-brand-primary">Quiz</Link>
          <Link href="/diff" className="hover:text-brand-primary">Diff</Link>
        </nav>
        <ThemeToggle />
      </div>
      <div className="border-t border-slate-200/70 px-4 py-3 lg:hidden dark:border-slate-800">
        <div className="mx-auto max-w-7xl">
          <SearchCombobox className="w-full" searchPageFallback="/search" />
        </div>
      </div>
    </header>
  )
}