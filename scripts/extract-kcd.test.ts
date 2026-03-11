import assert from 'node:assert/strict'
import test from 'node:test'

import { inferParentCode, parseLegacyScript, parseOfficialEntries } from './kcd-core'

test('inferParentCode prefers the longest previously seen valid prefix', () => {
  const parent = inferParentCode('K01.161', ['K01', 'K01.1', 'K01.16'])
  assert.equal(parent, 'K01.16')
})

test('inferParentCode handles underscore descendants', () => {
  const parent = inferParentCode('M79.1_0', ['M79', 'M79.1'])
  assert.equal(parent, 'M79.1')
})

test('parser preserves verbatim names and mixed separators', () => {
  const fixture = [
    '<script id="kcdRawData" type="text/plain">',
    '구강, 침샘 및 턱의 질환(K00-K14)',
    'K00\t치아의 발육 및 맹출장애',
    '제외 : 매몰치 및 매복치(K01.-)',
    'K01.16\t상악 대구치의 매복',
    'K01.161\t제1대구치',
    '',
    'M79\t달리 분류되지 않은 기타 연조직 장애',
    'M79.1\t근통',
    '주 : 5번째 자리는 부위별 세분류를 기재',
    'M79.1_0\t근막통증후군',
    '</script>',
  ].join('\n')

  const { rawLines } = parseLegacyScript(fixture)
  const entries = parseOfficialEntries(rawLines)

  assert.equal(entries[0].name_ko_official, '치아의 발육 및 맹출장애')
  assert.equal(entries[2].parent_code, 'K01.16')
  assert.equal(entries[5].parent_code, 'M79.1')
  assert.equal(entries[4].notes_official[0], '5번째 자리는 부위별 세분류를 기재')
})