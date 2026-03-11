'use client'

import { useEffect, useState } from 'react'

import { readAnalyticsState, recordCodeView, toggleFavorite } from '@/lib/analytics'

export function DetailActions({ code, title }: { code: string; title: string }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    recordCodeView(code)
    const state = readAnalyticsState()
    setIsFavorite(state.favorites.includes(code))
  }, [code])

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold dark:border-slate-700"
        onClick={async () => {
          await navigator.clipboard.writeText(code)
        }}
      >
        코드 복사
      </button>
      <button
        type="button"
        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold dark:border-slate-700"
        onClick={async () => {
          await navigator.clipboard.writeText(`${title} (${code})`)
        }}
      >
        이름 복사
      </button>
      <button
        type="button"
        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold dark:border-slate-700"
        onClick={() => setIsFavorite(toggleFavorite(code))}
      >
        {isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
      </button>
      <button
        type="button"
        className="rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white"
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: `${title} (${code})`, url: window.location.href }).catch(() => undefined)
            return
          }
          navigator.clipboard.writeText(window.location.href)
        }}
      >
        공유
      </button>
    </div>
  )
}