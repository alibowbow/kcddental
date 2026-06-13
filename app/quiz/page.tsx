import { QuizClient } from '@/components/learning/quiz-client'

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">학습 퀴즈</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          공식 코드 → 공식명, 공식명 → 코드, 포함/제외/주석 단서, 카테고리 분류 문제를 제공합니다.
        </p>
      </section>
      <QuizClient />
    </div>
  )
}