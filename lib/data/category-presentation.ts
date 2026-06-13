// Navigational presentation metadata for the K00-K14 primary categories.
// Descriptions paraphrase the official KCD category names for wayfinding only;
// they do not assert clinical, prevalence, or reimbursement facts.

export type CategoryAccent = 'sky' | 'cyan' | 'teal' | 'emerald' | 'violet' | 'indigo' | 'amber' | 'rose' | 'orange' | 'slate'

export interface CategoryPresentation {
  code: string
  short: string
  description: string
  accent: CategoryAccent
  icon: string
}

export const categoryPresentation: Record<string, CategoryPresentation> = {
  K00: {
    code: 'K00',
    short: '발육·맹출',
    description: '치아의 형성, 개수, 형태, 맹출과 관련된 발육 단계 장애를 모읍니다.',
    accent: 'sky',
    icon: 'sprout',
  },
  K01: {
    code: 'K01',
    short: '매몰·매복치',
    description: '정상 위치로 나오지 못한 매몰치와 매복치를 구분하는 코드 묶음입니다.',
    accent: 'cyan',
    icon: 'anchor',
  },
  K02: {
    code: 'K02',
    short: '치아우식',
    description: '법랑질에서 시멘트질까지 진행 부위에 따라 나뉘는 충치(치아우식) 코드입니다.',
    accent: 'amber',
    icon: 'cavity',
  },
  K03: {
    code: 'K03',
    short: '경조직 질환',
    description: '교모, 마모, 침식 등 우식이 아닌 치아 경조직의 변화를 다룹니다.',
    accent: 'orange',
    icon: 'layers',
  },
  K04: {
    code: 'K04',
    short: '치수·치근단',
    description: '치수염, 괴사, 근단주위 농양·낭 등 치아 내부와 뿌리 끝 조직의 질환입니다.',
    accent: 'rose',
    icon: 'pulse',
  },
  K05: {
    code: 'K05',
    short: '치은·치주',
    description: '치은염에서 치주염까지 잇몸과 치주조직 질환을 단계별로 분류합니다.',
    accent: 'emerald',
    icon: 'gum',
  },
  K06: {
    code: 'K06',
    short: '잇몸·치조융기',
    description: '치은퇴축, 치은비대 등 잇몸과 무치성 치조융기의 기타 장애입니다.',
    accent: 'teal',
    icon: 'wave',
  },
  K07: {
    code: 'K07',
    short: '부정교합·턱',
    description: '턱 크기·관계 이상과 부정교합, 턱관절장애를 포함한 치아얼굴이상입니다.',
    accent: 'violet',
    icon: 'jaw',
  },
  K08: {
    code: 'K08',
    short: '치아·지지구조',
    description: '치아상실, 잔존치근, 치조융기 위축 등 치아와 지지구조의 기타 장애입니다.',
    accent: 'indigo',
    icon: 'support',
  },
  K09: {
    code: 'K09',
    short: '구강 낭',
    description: '치성낭과 비치원성 낭 등 구강영역에 생기는 낭성 병변을 묶습니다.',
    accent: 'cyan',
    icon: 'bubble',
  },
  K10: {
    code: 'K10',
    short: '턱의 질환',
    description: '턱의 발육장애, 염증성 병태, 치조염 등 턱뼈 관련 기타 질환입니다.',
    accent: 'slate',
    icon: 'bone',
  },
  K11: {
    code: 'K11',
    short: '침샘 질환',
    description: '타액선염, 타석증, 점액류 등 침샘의 구조·분비 이상을 다룹니다.',
    accent: 'sky',
    icon: 'drop',
  },
  K12: {
    code: 'K12',
    short: '구내염',
    description: '재발성 아프타, 입점막염 등 입안 점막의 염증성 병변입니다.',
    accent: 'rose',
    icon: 'spark',
  },
  K13: {
    code: 'K13',
    short: '입술·점막',
    description: '입술 질환, 백반, 점막하 섬유증 등 입술과 구강점막의 기타 질환입니다.',
    accent: 'orange',
    icon: 'lips',
  },
  K14: {
    code: 'K14',
    short: '혀의 질환',
    description: '설염, 지도모양 혀, 설통 등 혀에서 나타나는 질환을 분류합니다.',
    accent: 'violet',
    icon: 'tongue',
  },
}

export function getCategoryPresentation(code: string): CategoryPresentation | null {
  return categoryPresentation[code] ?? null
}
