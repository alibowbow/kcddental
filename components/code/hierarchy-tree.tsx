import Link from 'next/link'

import { getChildren } from '@/lib/relations'
import type { OfficialKcdEntry } from '@/lib/types'
import { codeRoute } from '@/lib/format'

export function HierarchyTree({ roots, activeCode }: { roots: OfficialKcdEntry[]; activeCode?: string }) {
  return (
    <ul className="space-y-2">
      {roots.map((root) => (
        <HierarchyNode key={root.code} entry={root} activeCode={activeCode} level={0} />
      ))}
    </ul>
  )
}

function HierarchyNode({ entry, activeCode, level }: { entry: OfficialKcdEntry; activeCode?: string; level: number }) {
  const children = getChildren(entry.code)
  return (
    <li>
      <Link
        href={codeRoute(entry.code)}
        className={`flex items-start gap-3 rounded-xl px-3 py-2 text-sm ${
          activeCode === entry.code
            ? 'bg-sky-100 text-brand-primary dark:bg-sky-950/40 dark:text-sky-200'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
        }`}
        style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
      >
        <span className="code-font shrink-0 font-semibold">{entry.code}</span>
        <span className="leading-6">{entry.name_ko_official}</span>
      </Link>
      {children.length ? (
        <ul className="mt-1 space-y-1">
          {children.map((child) => (
            <HierarchyNode key={child.code} entry={child} activeCode={activeCode} level={level + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}