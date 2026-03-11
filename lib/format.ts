export const SITE_NAME = 'KCD Dental Reference'
export const SITE_ORIGIN = 'https://alibowbow.github.io'
export const SITE_BASE_PATH = '/kcddental'

export function withBasePath(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${SITE_BASE_PATH}${normalized === '/' ? '/' : normalized}`
}

export function absoluteSiteUrl(pathname = '/') {
  return new URL(withBasePath(pathname), SITE_ORIGIN).toString()
}

export function codeToParam(code: string) {
  return encodeURIComponent(code)
}

export function scopeLabel(scope: 'primary-k00-k14' | 'supplemental-dental-related') {
  return scope === 'primary-k00-k14' ? 'Primary' : 'Supplemental'
}

export function provenanceLabel(status: 'official-only' | 'verified' | 'pending') {
  if (status === 'verified') {
    return '검증완료'
  }
  if (status === 'pending') {
    return '준비중'
  }
  return '공식원문'
}

export function codeRoute(code: string) {
  return `/disease/${codeToParam(code)}`
}

export function claimRoute(code: string) {
  return `/claim/${codeToParam(code)}`
}

export function flowchartRoute(code: string) {
  return `/flowchart/${codeToParam(code)}`
}

export function printRoute(code: string) {
  return `/print/${codeToParam(code)}`
}