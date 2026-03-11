export interface QuizAttempt {
  mode: string
  score: number
  total: number
  completedAt: string
}

export interface LocalAnalyticsState {
  recentViews: string[]
  favorites: string[]
  viewCounts: Record<string, number>
  scoreHistory: QuizAttempt[]
  wrongAnswers: string[]
}

const STORAGE_KEY = 'kcddental-local-analytics'
const UPDATE_EVENT = 'kcddental-analytics-update'

const defaultState: LocalAnalyticsState = {
  recentViews: [],
  favorites: [],
  viewCounts: {},
  scoreHistory: [],
  wrongAnswers: [],
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function emitUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(UPDATE_EVENT))
  }
}

export function analyticsUpdateEventName() {
  return UPDATE_EVENT
}

export function readAnalyticsState(): LocalAnalyticsState {
  if (!canUseStorage()) {
    return defaultState
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultState
    }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function writeAnalyticsState(state: LocalAnalyticsState) {
  if (!canUseStorage()) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  emitUpdate()
}

export function recordCodeView(code: string) {
  const state = readAnalyticsState()
  const nextRecent = [code, ...state.recentViews.filter((item) => item !== code)].slice(0, 8)
  const nextCounts = {
    ...state.viewCounts,
    [code]: (state.viewCounts[code] ?? 0) + 1,
  }
  writeAnalyticsState({ ...state, recentViews: nextRecent, viewCounts: nextCounts })
}

export function toggleFavorite(code: string) {
  const state = readAnalyticsState()
  const exists = state.favorites.includes(code)
  const favorites = exists
    ? state.favorites.filter((item) => item !== code)
    : [code, ...state.favorites].slice(0, 24)
  writeAnalyticsState({ ...state, favorites })
  return !exists
}

export function pushQuizAttempt(attempt: QuizAttempt) {
  const state = readAnalyticsState()
  writeAnalyticsState({
    ...state,
    scoreHistory: [attempt, ...state.scoreHistory].slice(0, 20),
  })
}

export function rememberWrongAnswer(code: string) {
  const state = readAnalyticsState()
  writeAnalyticsState({
    ...state,
    wrongAnswers: [code, ...state.wrongAnswers.filter((item) => item !== code)].slice(0, 20),
  })
}