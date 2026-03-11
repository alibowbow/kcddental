'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { pushQuizAttempt, rememberWrongAnswer } from '@/lib/analytics'
import { officialKcdData, officialKcdMap } from '@/lib/data/official-kcd'
import { codeRoute } from '@/lib/format'

const QUESTION_POOL = officialKcdData.filter((entry) => entry.code.length <= 6 || entry.code.includes('_'))
const MODES = [
  { id: 'code-to-name', label: '코드 → 공식명' },
  { id: 'name-to-code', label: '공식명 → 코드' },
  { id: 'clue-to-code', label: '단서 → 코드' },
  { id: 'category', label: '카테고리 분류' },
] as const

type QuizMode = (typeof MODES)[number]['id']

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function makeSessionCodes(reviewCodes: string[] | null) {
  const pool = reviewCodes?.length ? QUESTION_POOL.filter((entry) => reviewCodes.includes(entry.code)) : QUESTION_POOL
  const count = Math.min(reviewCodes?.length ?? 10, pool.length)
  return shuffle(pool)
    .slice(0, count)
    .map((entry) => entry.code)
}

function buildQuestion(mode: QuizMode, answerCode: string) {
  const answer = officialKcdMap[answerCode]
  if (!answer) {
    return null
  }

  const distractors = shuffle(QUESTION_POOL.filter((entry) => entry.code !== answer.code)).slice(0, 3)
  const options = shuffle([answer, ...distractors])

  if (mode === 'name-to-code') {
    return {
      prompt: answer.name_ko_official,
      answerValue: answer.code,
      referenceCode: answer.code,
      options: options.map((item) => item.code),
    }
  }

  if (mode === 'clue-to-code') {
    const clue = answer.includes_official[0] ?? answer.excludes_official[0] ?? answer.notes_official[0] ?? answer.name_ko_official
    return {
      prompt: clue,
      answerValue: answer.code,
      referenceCode: answer.code,
      options: options.map((item) => item.code),
    }
  }

  if (mode === 'category') {
    const answerCategory = answer.code.slice(0, 3)
    const categoryOptions = shuffle(Array.from(new Set(QUESTION_POOL.map((item) => item.code.slice(0, 3))))).filter(
      (item) => item !== answerCategory,
    )
    return {
      prompt: `${answer.code}는 어떤 상위 카테고리에 속하나요?`,
      answerValue: answerCategory,
      referenceCode: answer.code,
      options: shuffle([answerCategory, ...categoryOptions.slice(0, 3)]),
    }
  }

  return {
    prompt: answer.code,
    answerValue: answer.name_ko_official,
    referenceCode: answer.code,
    options: options.map((item) => item.name_ko_official),
  }
}

export function QuizClient() {
  const [mode, setMode] = useState<QuizMode>('code-to-name')
  const [reviewCodes, setReviewCodes] = useState<string[] | null>(null)
  const [sessionCodes, setSessionCodes] = useState<string[]>(() => makeSessionCodes(null))
  const [questionNumber, setQuestionNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [wrongCodes, setWrongCodes] = useState<string[]>([])
  const [recordedKey, setRecordedKey] = useState<string | null>(null)

  const total = sessionCodes.length || 1
  const answerCode = sessionCodes[Math.min(questionNumber - 1, total - 1)]
  const question = useMemo(() => (answerCode ? buildQuestion(mode, answerCode) : null), [answerCode, mode])
  const completed = questionNumber > total
  const sessionKey = `${mode}:${reviewCodes?.join(',') ?? 'default'}:${sessionCodes.join(',')}`

  useEffect(() => {
    if (!completed || recordedKey === sessionKey) {
      return
    }

    pushQuizAttempt({ mode, score, total, completedAt: new Date().toISOString() })
    setRecordedKey(sessionKey)
  }, [completed, mode, recordedKey, score, sessionKey, total])

  const startSession = (nextMode: QuizMode, nextReviewCodes: string[] | null) => {
    setMode(nextMode)
    setReviewCodes(nextReviewCodes)
    setSessionCodes(makeSessionCodes(nextReviewCodes))
    setQuestionNumber(1)
    setScore(0)
    setWrongCodes([])
    setRecordedKey(null)
  }

  if (!question) {
    return null
  }

  if (completed) {
    return (
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">퀴즈 결과</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          정확도 {Math.round((score / total) * 100)}% · {score}/{total}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
            onClick={() => startSession(mode, null)}
          >
            다시 풀기
          </button>
          {wrongCodes.length ? (
            <button
              type="button"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700"
              onClick={() => startSession(mode, wrongCodes)}
            >
              오답만 다시 풀기
            </button>
          ) : null}
        </div>
        {wrongCodes.length ? (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">이번 세션 오답</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {wrongCodes.map((code) => {
                const entry = officialKcdMap[code]
                return entry ? (
                  <li key={code}>
                    <Link href={codeRoute(code)} className="hover:text-brand-primary hover:underline">
                      <span className="code-font font-semibold">{code}</span> {entry.name_ko_official}
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </div>
        ) : null}
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex flex-wrap gap-2">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => startSession(item.id, null)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              mode === item.id ? 'bg-brand-primary text-white' : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Question {questionNumber}/{total}</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-slate-50">{question.prompt}</h2>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className="rounded-2xl border border-slate-300/80 px-4 py-3 text-left text-sm font-medium hover:border-brand-accent dark:border-slate-700"
            onClick={() => {
              const correct = option === question.answerValue
              if (correct) {
                setScore((value) => value + 1)
              } else {
                rememberWrongAnswer(question.referenceCode)
                setWrongCodes((current) => (current.includes(question.referenceCode) ? current : [...current, question.referenceCode]))
              }
              setQuestionNumber((value) => value + 1)
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        공식 코드, 공식명, 공식 메모 기반 문제만 출제합니다. 검증된 시나리오 데이터는 아직 포함하지 않습니다.
      </p>
    </section>
  )
}