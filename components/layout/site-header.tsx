'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SearchCombobox } from '@/components/ui/search-combobox'
import { Icon } from '@/components/ui/icon'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const NAV_ITEMS: Array<{ href: string; label: string; icon: Parameters<typeof Icon>[0]['name'] }> = [
  { href: '/search', label: 'Search', icon: 'search' },
  { href: '/compare', label: 'Compare', icon: 'compare' },
  { href: '/claim', label: 'Claim', icon: 'claim' },
  { href: '/quiz', label: 'Quiz', icon: 'quiz' },
  { href: '/diff', label: 'Diff', icon: 'diff' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="print-hidden sticky top-0 z-40 border-b bg-white/75 backdrop-blur-md dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-sheen text-white shadow-glow">
            <Icon name="tooth" size={22} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-extrabold tracking-[0.14em] text-brand-primary">
              KCD DENTAL
            </span>
            <span className="mt-0.5 hidden truncate text-[11px] text-slate-500 dark:text-slate-400 sm:block">
              공식 원문 추출 + 검증된 보강 데이터
            </span>
          </span>
        </Link>

        <div className="hidden max-w-xl flex-1 lg:block">
          <SearchCombobox className="w-full" searchPageFallback="/search" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 text-sm md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition ${
                  active
                    ? 'bg-brand-primary/10 text-brand-primary dark:bg-sky-500/15'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-primary dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-slate-700 dark:text-slate-200 md:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      <div className="border-t px-4 py-3 lg:hidden">
        <div className="mx-auto max-w-7xl">
          <SearchCombobox className="w-full" searchPageFallback="/search" />
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold ${
                    active ? 'border-brand-accent bg-brand-primary/10 text-brand-primary' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
