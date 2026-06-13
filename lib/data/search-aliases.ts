// Everyday Korean search aliases that map common lay terms to official KCD codes.
// These are navigational aids only: each alias is a widely used colloquial name
// for the official category/code it points to, and asserts no clinical or
// reimbursement claim. Used to broaden search recall, never to add page content.

export interface SearchAlias {
  term: string
  code: string
}

export const searchAliases: SearchAlias[] = [
  // K00 발육·맹출
  { term: '치아없음', code: 'K00.0' },
  { term: '선천적치아결손', code: 'K00.0' },
  { term: '덧니', code: 'K00.1' },
  { term: '과잉치아', code: 'K00.1' },
  { term: '쌍둥이치아', code: 'K00.2' },
  { term: '치아변색', code: 'K00.3' },
  { term: '나는이', code: 'K00.7' },
  // K01 매복
  { term: '사랑니', code: 'K01.1' },
  { term: '지치', code: 'K01.1' },
  { term: '매복사랑니', code: 'K01.1' },
  { term: '안나온치아', code: 'K01.0' },
  // K02 우식
  { term: '충치', code: 'K02' },
  { term: '치아우식', code: 'K02' },
  { term: '우식증', code: 'K02' },
  { term: '썩은이', code: 'K02' },
  { term: '초기충치', code: 'K02.0' },
  { term: '깊은충치', code: 'K02.1' },
  // K03 경조직
  { term: '이갈이', code: 'K03.0' },
  { term: '치아마모', code: 'K03.1' },
  { term: '치아침식', code: 'K03.2' },
  { term: '시린이', code: 'K03.1' },
  // K04 치수
  { term: '신경치료', code: 'K04' },
  { term: '치수염', code: 'K04.0' },
  { term: '치통', code: 'K04.0' },
  { term: '이아픔', code: 'K04.0' },
  { term: '신경죽음', code: 'K04.1' },
  { term: '잇몸고름', code: 'K04.6' },
  { term: '치아농양', code: 'K04.7' },
  { term: '물혹', code: 'K04.8' },
  // K05 치주
  { term: '잇몸병', code: 'K05' },
  { term: '풍치', code: 'K05.3' },
  { term: '치주염', code: 'K05.3' },
  { term: '잇몸염증', code: 'K05.1' },
  { term: '치은염', code: 'K05.0' },
  { term: '잇몸붓기', code: 'K05.0' },
  // K06 잇몸
  { term: '잇몸내려감', code: 'K06.0' },
  { term: '치은퇴축', code: 'K06.0' },
  { term: '잇몸커짐', code: 'K06.1' },
  // K07 부정교합·턱
  { term: '부정교합', code: 'K07.4' },
  { term: '주걱턱', code: 'K07.1' },
  { term: '무턱', code: 'K07.0' },
  { term: '뻐드렁니', code: 'K07.3' },
  { term: '덧니교정', code: 'K07.3' },
  { term: '턱관절', code: 'K07.6' },
  { term: '턱소리', code: 'K07.6' },
  { term: '교정', code: 'K07' },
  // K08 치아상실
  { term: '치아상실', code: 'K08.1' },
  { term: '발치후', code: 'K08.1' },
  { term: '이빠짐', code: 'K08.1' },
  { term: '잔존치근', code: 'K08.3' },
  { term: '치아뿌리', code: 'K08.3' },
  // K09 낭
  { term: '치아물혹', code: 'K09.0' },
  { term: '턱물혹', code: 'K09.2' },
  // K10 턱
  { term: '턱뼈질환', code: 'K10' },
  { term: '발치후염증', code: 'K10.3' },
  { term: '드라이소켓', code: 'K10.3' },
  // K11 침샘
  { term: '침샘', code: 'K11' },
  { term: '침샘염', code: 'K11.2' },
  { term: '침샘돌', code: 'K11.5' },
  { term: '타석', code: 'K11.5' },
  { term: '입마름', code: 'K11.7' },
  { term: '구강건조', code: 'K11.7' },
  // K12 구내염
  { term: '구내염', code: 'K12' },
  { term: '입병', code: 'K12.0' },
  { term: '아프타', code: 'K12.0' },
  { term: '입안헐음', code: 'K12.1' },
  // K13 입술·점막
  { term: '입술질환', code: 'K13.0' },
  { term: '입술트임', code: 'K13.0' },
  { term: '백반증', code: 'K13.2' },
  // K14 혀
  { term: '혀질환', code: 'K14' },
  { term: '설염', code: 'K14.0' },
  { term: '지도혀', code: 'K14.1' },
  { term: '혀통증', code: 'K14.6' },
  { term: '혀갈라짐', code: 'K14.5' },
]
