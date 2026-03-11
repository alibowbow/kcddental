import type { CategoryMeta } from '../types'

export interface SupplementalClusterMeta {
  slug: string
  label: string
  description: string
  prefixes: string[]
}

export const primaryCategoryMeta: CategoryMeta[] = [
  'K00',
  'K01',
  'K02',
  'K03',
  'K04',
  'K05',
  'K06',
  'K07',
  'K08',
  'K09',
  'K10',
  'K11',
  'K12',
  'K13',
  'K14',
].map((code) => ({
  slug: code.toLowerCase(),
  code,
  cluster: 'primary',
  label: code,
}))

export const supplementalClusterMeta: SupplementalClusterMeta[] = [
  {
    slug: 'trauma',
    label: '외상 / 손상',
    description: '구강·안면 외상, 치아 손상, 장치 합병증과 연결되는 보조 코드 묶음',
    prefixes: ['S00', 'S01', 'S02', 'S03', 'T85'],
  },
  {
    slug: 'congenital',
    label: '선천 기형',
    description: '구순구개열과 구강·안면 선천 기형 관련 보조 코드 묶음',
    prefixes: ['Q35', 'Q36', 'Q37', 'Q38'],
  },
  {
    slug: 'tmj-pain',
    label: 'TMJ / 통증',
    description: '턱관절, 저작근, 안면 통증과 이어지는 보조 코드 묶음',
    prefixes: ['K07.6', 'M79', 'M61', 'M62'],
  },
  {
    slug: 'prosthetic-device',
    label: '보철 / 장치',
    description: '보철 장치 부착·조정·존재와 관련된 보조 코드 묶음',
    prefixes: ['Z46.3', 'Z46.4', 'Z96.5', 'Z97.2', 'T85.6'],
  },
]