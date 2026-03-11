import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200/70 bg-white/85 p-10 text-center shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-50">요청한 코드를 찾을 수 없습니다.</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        정적 생성된 공식 KCD 코드 목록에 없는 경우 detail route는 404를 반환합니다.
      </p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white">
        홈으로 돌아가기
      </Link>
    </section>
  )
}