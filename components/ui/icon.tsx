import type { SVGProps } from 'react'

import type { CategoryAccent } from '@/lib/data/category-presentation'

export type IconName =
  | 'tooth'
  | 'sprout'
  | 'anchor'
  | 'cavity'
  | 'layers'
  | 'pulse'
  | 'gum'
  | 'wave'
  | 'jaw'
  | 'support'
  | 'bubble'
  | 'bone'
  | 'drop'
  | 'spark'
  | 'lips'
  | 'tongue'
  | 'search'
  | 'compare'
  | 'claim'
  | 'quiz'
  | 'diff'
  | 'print'
  | 'flow'
  | 'star'
  | 'arrow-right'
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon'
  | 'check'
  | 'shield'

// Stroke-based 24x24 glyphs. Decorative wayfinding marks, not clinical diagrams.
const paths: Record<IconName, string> = {
  tooth: 'M8 3c-2.5 0-4 1.8-4 4.2 0 2 .7 3.2 1.3 5.4.5 1.8.6 3.4.9 5 .2 1.4.6 2.4 1.3 2.4.9 0 1-1.4 1.2-3 .1-1 .4-1.6 1.3-1.6s1.2.6 1.3 1.6c.2 1.6.3 3 1.2 3 .7 0 1.1-1 1.3-2.4.3-1.6.4-3.2.9-5C17.3 10.4 18 9.2 18 7.2 18 4.8 16.5 3 14 3c-1.3 0-1.7.6-3 .6S9.3 3 8 3Z',
  sprout: 'M12 20v-7m0 0c0-3 2-5 5-5-.2 3-2 5-5 5Zm0 0c0-3-2-5-5-5 .2 3 2 5 5 5Z',
  anchor: 'M12 7v13m0 0c-3.3 0-6-2.4-6-6m6 6c3.3 0 6-2.4 6-6m-9 0H4m13 0h3M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  cavity: 'M8 3c-2.5 0-4 1.8-4 4.2 0 2 .7 3.2 1.3 5.4.5 1.8.6 3.4.9 5 .2 1.4.6 2.4 1.3 2.4.9 0 1-1.4 1.2-3 .1-1 .4-1.6 1.3-1.6s1.2.6 1.3 1.6c.2 1.6.3 3 1.2 3 .7 0 1.1-1 1.3-2.4.3-1.6.4-3.2.9-5C17.3 10.4 18 9.2 18 7.2 18 4.8 16.5 3 14 3c-1.3 0-1.7.6-3 .6S9.3 3 8 3Zm2 6.5 1.5-1.5 1.5 1.5-1.5 1.5Z',
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm-9 8 9 5 9-5m-18 5 9 5 9-5',
  pulse: 'M3 12h4l2-6 4 14 2-8h6',
  gum: 'M4 7c2-2 4 1 8 1s6-3 8-1c0 5-2 9-5 12-1 1-1 1-3 1s-2 0-3-1C6 16 4 12 4 7Z',
  wave: 'M3 8c1.5-2 3-2 4.5 0S10.5 10 12 8s3-2 4.5 0 3 2 4.5 0M3 14c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0',
  jaw: 'M5 4v6c0 5 3 9 7 9s7-4 7-9V4M5 8h14',
  support: 'M12 3v8m0 0c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5ZM9 21h6',
  bubble: 'M12 4c-4 0-7 2.5-7 6 0 2 1 3.6 3 4.7L7 19l4-2c.3 0 .6.1 1 .1 4 0 7-2.5 7-6s-3-7-7-7Z',
  bone: 'M7 7a2.2 2.2 0 1 0-1.6 3.7L12 17l6.6-6.3A2.2 2.2 0 1 0 17 7a2.2 2.2 0 1 0-3.7-1.6L12 6.6 10.7 5.4A2.2 2.2 0 1 0 7 7Z',
  drop: 'M12 3c0 0-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z',
  spark: 'M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-6.5-2.8 2.8m-3.4 3.4-2.8 2.8m12 0-2.8-2.8m-3.4-3.4L7.5 5.5',
  lips: 'M4 11c2-3 5-1 8-1s6-2 8 1c-2 4-5 5-8 5s-6-1-8-5Zm0 0c2 1 5 1 8 1s6 0 8-1',
  tongue: 'M6 4h12v6c0 5-2.5 10-6 10s-6-5-6-10V4Zm6 6v8',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM20 20l-4.8-4.8',
  compare: 'M9 4v16M4 8l5-4 5 4M15 20V4m5 12-5 4-5-4',
  claim: 'M6 3h9l3 3v15H6V3Zm9 0v3h3M9 11h6M9 15h6',
  quiz: 'M12 14a3 3 0 1 0-3-3m3 3v.5m0 3.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
  diff: 'M12 4v16M4 9h8M16 12h4m-2-2v4',
  print: 'M7 8V3h10v5M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7v-7Z',
  flow: 'M5 4h5v4H5V4Zm9 12h5v4h-5v-4ZM7 8v4a2 2 0 0 0 2 2h5m2-6h2',
  star: 'M12 4l2.3 4.8 5.2.7-3.8 3.6.9 5.1L12 16.9 7.4 18.3l.9-5.1L4.5 9.6l5.2-.7L12 4Z',
  'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-4v2m0 14v2M5 5l1.5 1.5M17.5 17.5 19 19M3 12h2m14 0h2M5 19l1.5-1.5M17.5 6.5 19 5',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z',
  check: 'M5 12.5 10 17.5 19.5 6.5',
  shield: 'M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z',
}

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}

const accentClasses: Record<CategoryAccent, { soft: string; text: string; ring: string }> = {
  sky: { soft: 'bg-sky-100 dark:bg-sky-950/50', text: 'text-sky-700 dark:text-sky-300', ring: 'group-hover:border-sky-400' },
  cyan: { soft: 'bg-cyan-100 dark:bg-cyan-950/50', text: 'text-cyan-700 dark:text-cyan-300', ring: 'group-hover:border-cyan-400' },
  teal: { soft: 'bg-teal-100 dark:bg-teal-950/50', text: 'text-teal-700 dark:text-teal-300', ring: 'group-hover:border-teal-400' },
  emerald: { soft: 'bg-emerald-100 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-300', ring: 'group-hover:border-emerald-400' },
  violet: { soft: 'bg-violet-100 dark:bg-violet-950/50', text: 'text-violet-700 dark:text-violet-300', ring: 'group-hover:border-violet-400' },
  indigo: { soft: 'bg-indigo-100 dark:bg-indigo-950/50', text: 'text-indigo-700 dark:text-indigo-300', ring: 'group-hover:border-indigo-400' },
  amber: { soft: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-300', ring: 'group-hover:border-amber-400' },
  rose: { soft: 'bg-rose-100 dark:bg-rose-950/50', text: 'text-rose-700 dark:text-rose-300', ring: 'group-hover:border-rose-400' },
  orange: { soft: 'bg-orange-100 dark:bg-orange-950/50', text: 'text-orange-700 dark:text-orange-300', ring: 'group-hover:border-orange-400' },
  slate: { soft: 'bg-slate-200 dark:bg-slate-800/70', text: 'text-slate-700 dark:text-slate-300', ring: 'group-hover:border-slate-400' },
}

export function accentStyles(accent: CategoryAccent) {
  return accentClasses[accent]
}
