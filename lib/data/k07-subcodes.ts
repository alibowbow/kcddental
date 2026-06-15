import type { EnrichedDiseaseEntry } from '../types'

type K07Reference = {
  title: string
  url: string
  type: 'guideline' | 'pubmed' | 'textbook' | 'official' | 'hira'
  year?: number
  note: string
}

type K07Config = {
  code: string
  name_en: string
  definition: string
  summary: string
  references: K07Reference[]
  anatomy?: string[]
  pathophysiology?: string
  etiology?: string[]
  risk_factors?: string[]
  symptoms?: {
    name: string
    severity?: 'mild' | 'moderate' | 'severe'
  }[]
  diagnostic?: string[]
  treatment?: EnrichedDiseaseEntry['treatment']
  prognosis?: string
  prevention?: string[]
}

const K07_UPDATED_AT = '2026-03-23'

function makeK07Entry(
  params: Omit<EnrichedDiseaseEntry, 'external' | 'provenance'> & {
    references: K07Reference[]
  },
): EnrichedDiseaseEntry {
  const { references, ...entry } = params

  return {
    ...entry,
    external: {
      references: references.map(({ note, ...reference }) => reference),
    },
    provenance: {
      status: 'pending',
      updated_at: K07_UPDATED_AT,
      sources: references.map(({ title, url, year, note }) => ({
        title,
        url,
        year,
        note,
      })),
    },
  }
}

function createK07Entry(config: K07Config): EnrichedDiseaseEntry {
  const {
    code,
    name_en,
    definition,
    summary,
    references,
    anatomy,
    pathophysiology,
    etiology,
    risk_factors,
    symptoms,
    diagnostic,
    treatment,
    prognosis,
    prevention,
  } = config

  return makeK07Entry({
    code,
    name_en,
    definition,
    pathophysiology,
    etiology,
    anatomy_involved: anatomy,
    risk_factors,
    symptoms: symptoms?.map(({ name, severity = 'moderate' }) => ({
      name,
      severity,
      is_pathognomonic: false,
    })),
    diagnostic_criteria: diagnostic,
    treatment,
    prognosis,
    prevention,
    patient_friendly_summary: summary,
    references,
  })
}

const orthodonticEvaluation: NonNullable<EnrichedDiseaseEntry['treatment']> = [
  {
    approach: '교정 진단과 교합 분석',
    description:
      '사진, 방사선, 교합 기록을 바탕으로 현재 문제의 중심이 치아 배열인지, 치열궁 관계인지, 턱뼈 비율인지 먼저 구분한 뒤 치료 계획을 세웁니다.',
    evidence_level: 'Expert',
    is_insured: null,
  },
]

const orthodonticSurgicalEvaluation: NonNullable<EnrichedDiseaseEntry['treatment']> = [
  {
    approach: '교정과 악교정수술 연계 평가',
    description:
      '문제가 경미하면 교정 치료가 중심이 되지만, 턱 크기나 턱 위치 차이가 크면 교정 단독으로는 한계가 있어 악교정수술 평가가 함께 필요할 수 있습니다.',
    evidence_level: 'Expert',
    is_insured: null,
  },
]

const functionalEvaluation: NonNullable<EnrichedDiseaseEntry['treatment']> = [
  {
    approach: '기능 원인 교정과 교정 평가',
    description:
      '손가락 빨기, 입호흡, 혀 습관, 비정상 삼킴 같은 원인을 먼저 확인하고, 필요하면 이비인후과·소아치과·교정과와 함께 기능 교정과 치열 교정을 계획합니다.',
    evidence_level: 'Expert',
    is_insured: null,
  },
]

const tmdConservativeTreatment: NonNullable<EnrichedDiseaseEntry['treatment']> = [
  {
    approach: '보존적 턱관절 관리',
    description:
      '대부분은 부드러운 음식, 온·냉찜질, 통증 조절, 턱 스트레칭, 행동 조절 같은 보존 치료가 우선이며, 영상검사나 추가 처치는 증상 지속과 진찰 소견에 따라 결정합니다.',
    evidence_level: 'Expert',
    is_insured: null,
  },
]

const jawSizeReferences: K07Reference[] = [
  {
    title: 'Micrognathia | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003306.htm',
    type: 'official',
    year: 2025,
    note: '작은 턱이 수유, 공간 부족, 치열 배열에 영향을 줄 수 있다는 patient-facing 설명을 K07.0 계열에 반영했습니다.',
  },
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: '턱 크기 불균형이 부정교합과 연결될 수 있다는 설명을 보강했습니다.',
  },
  {
    title: 'Orthognathic Surgery (jaw realignment) | NHS Royal Devon',
    url: 'https://www.royaldevon.nhs.uk/services/oral-maxillofacial/orthognathic-surgery-jaw-realignment/',
    type: 'official',
    year: 2022,
    note: '턱 크기·비율 이상에서 수술 평가가 필요한 상황과 목표를 반영했습니다.',
  },
  {
    title: 'Jaw or chin corrective surgery (orthognathic surgery) | CUH',
    url: 'https://www.cuh.nhs.uk/patient-information/patient-information-and-consent-to-jaw-or-chin-corrective-surgery-orthognathic-surgery/',
    type: 'official',
    year: 2025,
    note: '상악, 하악, 양악 수술이 각각 어떤 턱 문제에 연결되는지 patient-facing 설명을 보강했습니다.',
  },
]

const jawRelationshipReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: 'class II, class III, 턱 비율 차이와 교합 이상 연결을 K07.1 계열에 반영했습니다.',
  },
  {
    title: 'Orthognathic Surgery (jaw realignment) | NHS Royal Devon',
    url: 'https://www.royaldevon.nhs.uk/services/oral-maxillofacial/orthognathic-surgery-jaw-realignment/',
    type: 'official',
    year: 2022,
    note: '얼굴 비대칭, 돌출 또는 후퇴한 턱, 앞니가 닿지 않는 개방교합 같은 수술 적응증을 보강했습니다.',
  },
  {
    title: 'Jaw surgery (orthognathic treatment) | NUH',
    url: 'https://www.nuh.nhs.uk/orthodontics-jaw-surgery-orthognathic-treatment/',
    type: 'official',
    year: 2026,
    note: '교정 단독으로 해결되지 않는 skeletal jaw relationship 문제라는 점을 보강했습니다.',
  },
  {
    title: 'Craniofacial microsomia | Great Ormond Street Hospital',
    url: 'https://www.gosh.nhs.uk/conditions-and-treatments/conditions-we-treat/craniofacial-microsomia/',
    type: 'official',
    year: 2026,
    note: '비대칭을 patient-facing으로 설명할 때 한쪽 턱 발육 차이의 예시로 참고했습니다.',
  },
]

const archRelationshipReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: '부정교합의 기본 개념과 jaw mismatch 설명을 K07.2 계열에 반영했습니다.',
  },
  {
    title: 'Malocclusion (Misaligned Bite): Types & Treatment | Cleveland Clinic',
    url: 'https://my.clevelandclinic.org/health/diseases/22010-malocclusion',
    type: 'official',
    year: 2024,
    note: 'overjet, overbite, open bite, crossbite 같은 patient-facing 유형 설명을 보강했습니다.',
  },
  {
    title: 'Orthodontics | NHS',
    url: 'https://www.nhs.uk/tests-and-treatments/orthodontics/',
    type: 'official',
    year: 2023,
    note: '교정 치료가 흔히 쓰이는 bite-relationship 문제라는 점을 반영했습니다.',
  },
  {
    title: '7 Common Types of Bite Problems and Their Orthodontic Solutions | AAO',
    url: 'https://aaoinfo.org/whats-trending/7-common-bite-problems/',
    type: 'official',
    year: 2024,
    note: '환자 친화적인 bite pattern 명칭과 치료 방향 설명을 보강했습니다.',
  },
]

const toothPositionReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: 'crowding, spacing, 배열 이상이 부정교합에 포함된다는 설명을 K07.3 계열에 반영했습니다.',
  },
  {
    title: 'Common Orthodontic Problems: Know What to Look For | AAO',
    url: 'https://aaoinfo.org/resources/common-orthodontic-problems/',
    type: 'official',
    year: 2026,
    note: 'crowding, spacing, rotation 같은 치아 위치 문제를 patient-facing으로 설명하는 데 참고했습니다.',
  },
  {
    title: 'Impacted tooth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001057.htm',
    type: 'official',
    year: 2024,
    note: '매복치가 공간 부족이나 이상 맹출 각도와 연관된다는 설명을 K07.35에 반영했습니다.',
  },
  {
    title: 'Orthodontic Glossary: Braces & Dental Terms Defined | AAO',
    url: 'https://aaoinfo.org/resources/glossary-of-orthodontic-terms/',
    type: 'official',
    year: 2026,
    note: 'rotation, displacement, spacing 같은 용어의 patient-facing 정리를 보강했습니다.',
  },
]

const unspecifiedMalocclusionReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: 'malocclusion 자체의 broad definition과 증상, 치료 방향을 K07.4에 반영했습니다.',
  },
  {
    title: 'Braces and orthodontics | NHS',
    url: 'https://www.nhs.uk/conditions/braces-and-orthodontics/',
    type: 'official',
    year: 2026,
    note: '정확한 subtype이 없어도 교정 평가가 치료 진입점이 된다는 점을 보강했습니다.',
  },
  {
    title: 'Common Orthodontic Problems: Know What to Look For | AAO',
    url: 'https://aaoinfo.org/resources/common-orthodontic-problems/',
    type: 'official',
    year: 2026,
    note: '구체 subtype이 밝혀지면 K07.2 또는 K07.3으로 세분화해야 한다는 설명을 보강했습니다.',
  },
]

const functionalReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: 'thumb sucking, tongue thrust, jaw-tooth mismatch가 malocclusion의 원인이 될 수 있다는 설명을 K07.5 계열에 반영했습니다.',
  },
  {
    title: 'Dummies and thumb sucking | Healthier Together',
    url: 'https://stw-healthiertogether.nhs.uk/parentscarers/oral-health/oral-health-babies/dummies-and-thumb-sucking',
    type: 'official',
    year: 2026,
    note: '손가락 빨기와 더미 사용이 앞니와 bite pattern에 영향을 줄 수 있다는 설명을 보강했습니다.',
  },
  {
    title: 'Adenoid Surgery | Oxford University Hospitals NHS Foundation Trust',
    url: 'https://www.ouh.nhs.uk/media/tuoj3iog/97599adenoid.pdf',
    type: 'official',
    year: 2026,
    note: '큰 아데노이드로 인해 코막힘과 구호흡이 생길 수 있다는 patient-facing 설명을 K07.52에 반영했습니다.',
  },
  {
    title: 'Oral hygiene advice | Queen Victoria Hospital NHS Foundation Trust',
    url: 'https://www.qvh.nhs.uk/download/patient-information-leaflets/oral-hygiene-advice-a-guide-for-children-young-people-and-their-parents-carers/',
    type: 'official',
    year: 2022,
    note: '장기간의 구강 습관과 관리 문제를 어린이·보호자 안내 수준에서 설명하는 자료로 참고했습니다.',
  },
]

const tmdReferences: K07Reference[] = [
  {
    title: 'TMD | National Institute of Dental and Craniofacial Research',
    url: 'https://www.nidcr.nih.gov/health-info/tmd',
    type: 'official',
    year: 2024,
    note: '턱관절과 저작근 문제, 보존적 치료 우선 원칙, 정확한 단일 검사 부재를 K07.6 child code 전반에 반영했습니다.',
  },
  {
    title: 'Temporomandibular Disorders | MedlinePlus',
    url: 'https://medlineplus.gov/temporomandibulardisorders.html',
    type: 'official',
    year: 2024,
    note: '통증, 소리, 잠김, 개구 제한 같은 patient-facing 증상 분류를 보강했습니다.',
  },
  {
    title: 'TMJ disorders | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001227.htm',
    type: 'official',
    year: 2024,
    note: 'joint problem과 muscle problem이 겹칠 수 있다는 설명과 imaging 고려 지점을 보강했습니다.',
  },
]

const otherDentofacialReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: '기타 dentofacial anomaly를 broad하게 설명할 때 부정교합의 기본 틀을 참고했습니다.',
  },
  {
    title: 'Orthodontics | NHS',
    url: 'https://www.nhs.uk/tests-and-treatments/orthodontics/',
    type: 'official',
    year: 2023,
    note: '교정 평가가 common first step이라는 설명을 보강했습니다.',
  },
  {
    title: 'Jaw or chin corrective surgery (orthognathic surgery) | CUH',
    url: 'https://www.cuh.nhs.uk/patient-information/patient-information-and-consent-to-jaw-or-chin-corrective-surgery-orthognathic-surgery/',
    type: 'official',
    year: 2025,
    note: '교정 단독으로 해결되지 않는 구조적 dentofacial anomaly에서는 수술 평가가 필요할 수 있다는 점을 반영했습니다.',
  },
]

const unspecifiedDentofacialReferences: K07Reference[] = [
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: '정확한 subtype이 없는 dentofacial anomaly fallback 설명을 K07.9에 반영했습니다.',
  },
  {
    title: 'Orthodontics | NHS',
    url: 'https://www.nhs.uk/tests-and-treatments/orthodontics/',
    type: 'official',
    year: 2023,
    note: '정밀 분류 전에도 교정 평가가 첫 단계가 될 수 있다는 점을 보강했습니다.',
  },
  {
    title: 'Temporomandibular Disorders | MedlinePlus',
    url: 'https://medlineplus.gov/temporomandibulardisorders.html',
    type: 'official',
    year: 2024,
    note: '턱관절 문제와 단순 dentofacial anomaly unspecified를 섞지 않도록 경계 설명을 보강했습니다.',
  },
]

const jawSizeEntries: K07Config[] = [
  {
    code: 'K07.0',
    name_en: 'Major anomalies of jaw size',
    definition:
      'K07.0은 턱 자체가 지나치게 크거나 작아서 얼굴 비율과 교합에 영향을 주는 skeletal discrepancy를 묶는 범주입니다. 치아 배열만의 문제보다 상악과 하악의 크기 자체가 핵심입니다.',
    summary:
      'K07.0은 윗턱이나 아랫턱 자체의 크기 이상을 뜻합니다. 치아가 삐뚤어진 것과는 다르게, 턱뼈 비율 문제라서 교정 단독보다 수술 평가가 함께 논의되는 경우가 있습니다.',
    pathophysiology:
      '위턱이나 아래턱의 크기·비율이 정상과 달라, 치아가 들어설 공간과 위아래 턱의 맞물림에 영향을 줍니다. 작은 아래턱(소악증)은 수유나 정렬에 영향을 줄 수 있습니다.',
    etiology: [
      '턱뼈의 발육성 크기·비율 이상',
      '위턱과 아래턱의 크기 불균형(예: class II·class III 양상)',
    ],
    anatomy: ['상악', '하악', '교합 관계'],
    symptoms: [
      { name: '턱이 크거나 작아 보여 얼굴 비율과 옆모습이 달라질 수 있습니다.' },
      { name: '앞니가 잘 맞지 않거나, 치아가 들어갈 공간이 부족해 보일 수 있습니다.' },
    ],
    diagnostic: [
      '기록에 상악 또는 하악의 대악증, 소악증, 형성저하 같은 턱 크기 이상이 명시된 경우에 사용합니다.',
      '단순 돌출입이나 crowding만으로는 확정하지 않고, 턱 자체의 크기와 비율 평가를 함께 봅니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    prognosis:
      '교정 단독으로 교정되지 않는 턱 크기·정렬 불균형은 악교정수술로 씹기, 얼굴 균형, 입술 다물기, 교합 맞춤을 개선할 수 있습니다.',
    references: jawSizeReferences,
  },
  {
    code: 'K07.00',
    name_en: 'Maxillary macrognathia',
    definition:
      '상악 자체가 크거나 과성장한 상태를 뜻합니다. 앞니 돌출처럼 보이더라도 핵심은 윗턱뼈의 크기와 비율 문제입니다.',
    summary:
      'K07.00은 윗턱이 실제로 큰 쪽으로 기록된 경우에 쓰는 코드입니다. 치아만 앞으로 나온 경우와는 구분해야 합니다.',
    anatomy: ['상악', '상악 치열궁'],
    symptoms: [{ name: '윗턱이 도드라져 보이거나 위앞니 쪽 돌출이 강조될 수 있습니다.' }],
    diagnostic: [
      '상악 대악증, 상악 증식증, maxillary excess처럼 윗턱 과성장이 명시된 경우에 사용합니다.',
      '전치 돌출만 있고 상악 크기 평가는 없으면 K07.2 또는 K07.3 쪽을 먼저 고려합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.01',
    name_en: 'Mandibular macrognathia',
    definition:
      '하악 자체가 크거나 과성장한 상태를 뜻합니다. underbite처럼 보일 수 있지만 핵심은 하악의 크기 증가입니다.',
    summary:
      'K07.01은 아랫턱이 큰 쪽으로 기록된 경우입니다. 단순한 반대교합보다 턱뼈 크기 자체가 문제일 때 쓰는 코드입니다.',
    anatomy: ['하악', '하악 치열궁'],
    symptoms: [{ name: '턱끝이 크거나 앞으로 나와 보이고 아래쪽 얼굴 비율이 달라질 수 있습니다.' }],
    diagnostic: [
      '하악 대악증, 하악 과성장, mandibular excess가 명시된 경우에 사용합니다.',
      '치아만 앞으로 물리는 mesio-occlusion과 구분해 skeletal note가 있는지 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.02',
    name_en: 'Bimaxillary macrognathia',
    definition:
      '상악과 하악 모두가 큰 쪽으로 평가된 상태입니다. 양악 비율 전체가 커 보여 얼굴 돌출감과 교합 문제가 함께 나타날 수 있습니다.',
    summary:
      'K07.02는 윗턱과 아랫턱이 모두 큰 방향으로 기록된 경우입니다. 한쪽 턱만 큰 문제보다 전체 비율 이상에 가깝습니다.',
    anatomy: ['상악', '하악', '안면 하부 비율'],
    symptoms: [{ name: '입술이 잘 다물어지지 않거나 양악 전방 돌출처럼 보일 수 있습니다.' }],
    diagnostic: [
      '양악 대악증 또는 상·하악 모두 과성장이라는 기록이 있을 때 사용합니다.',
      '한쪽 턱만 명시된 경우에는 더 구체적인 child code를 우선합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.03',
    name_en: 'Maxillary micrognathia',
    definition:
      '상악이 작거나 형성저하된 상태입니다. 중안면이 꺼져 보이거나 위쪽 치열궁 공간이 부족해 보일 수 있습니다.',
    summary:
      'K07.03은 윗턱이 작은 쪽으로 기록된 경우입니다. 얼굴 중간 부분이 들어가 보이거나 교합이 맞지 않을 수 있습니다.',
    anatomy: ['상악', '중안면', '상악 치열궁'],
    symptoms: [{ name: '윗턱이 작아 보여 앞니 관계가 반대로 보이거나 중안면이 평평해 보일 수 있습니다.' }],
    diagnostic: [
      '상악 소악증, 상악 형성저하, maxillary deficiency가 명시된 경우에 사용합니다.',
      '반대교합이 있더라도 상악 저형성인지 하악 돌출인지 구분 기록을 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.04',
    name_en: 'Mandibular micrognathia',
    definition:
      '하악이 작거나 형성저하된 상태입니다. 작은 턱, 뒤로 들어간 턱끝, 공간 부족과 bite mismatch가 동반될 수 있습니다.',
    summary:
      'K07.04는 아랫턱이 작은 쪽으로 기록된 경우입니다. 심하면 수유, 기도, 교합까지 함께 평가해야 할 수 있습니다.',
    anatomy: ['하악', '턱끝', '기도와 교합 공간'],
    symptoms: [
      { name: '아랫턱이 뒤로 들어가 보이거나 턱끝이 작은 인상이 나타날 수 있습니다.' },
      { name: '치아 공간 부족이나 overjet 증가가 함께 보일 수 있습니다.', severity: 'mild' },
    ],
    diagnostic: [
      '하악 소악증, 하악 형성저하, micrognathia가 명시된 경우에 사용합니다.',
      '단순 class II bite만으로 확정하지 않고, 하악 크기 자체 평가가 있는지 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.05',
    name_en: 'Bimaxillary micrognathia',
    definition:
      '상악과 하악이 모두 작은 쪽으로 평가된 상태입니다. 양악의 발육 저하가 얼굴 비율과 교합에 같이 영향을 줄 수 있습니다.',
    summary:
      'K07.05는 윗턱과 아랫턱이 모두 작은 경우입니다. 한쪽 턱만 작은 문제보다 더 넓은 skeletal imbalance에 가깝습니다.',
    anatomy: ['상악', '하악', '안면 비율'],
    symptoms: [{ name: '아래 얼굴이 작아 보이거나 치열이 충분히 자리잡지 못한 인상이 나타날 수 있습니다.' }],
    diagnostic: [
      '양악 소악증 또는 상·하악 모두 형성저하라는 기록이 있을 때 사용합니다.',
      '한쪽 턱만 작은 것으로 기록되면 해당 child code를 우선합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.08',
    name_en: 'Other specified anomaly of jaw size',
    definition:
      '턱 크기 이상이 분명하지만 K07.00~K07.05의 전형적 패턴으로는 딱 들어맞지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.08은 턱 크기 이상이 분명하게 적혀 있지만, 윗턱·아랫턱·양악의 전형적 분류로 정리되지 않을 때 쓰는 코드입니다.',
    anatomy: ['상악 또는 하악', '안면 비율'],
    symptoms: [{ name: '얼굴 비율과 교합에 영향을 주는 턱 크기 이상이 기록될 수 있습니다.' }],
    diagnostic: [
      '턱 크기 anomaly가 명시돼 있고, 다른 named subtype에 정확히 맞지 않을 때 사용합니다.',
      '애매한 경우 unspecified code보다 specified 기타 코드를 쓰려면 기록에 구체 설명이 있어야 합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
  {
    code: 'K07.09',
    name_en: 'Anomaly of jaw size, unspecified',
    definition:
      '턱 크기 이상이 있다는 정보는 있지만 어떤 턱이 크거나 작은지, 패턴이 무엇인지 더 적혀 있지 않은 상태입니다.',
    summary:
      'K07.09는 턱 크기 이상이 있다고만 적혀 있고 자세한 subtype이 없는 경우에 쓰는 fallback 코드입니다.',
    anatomy: ['상악 또는 하악'],
    symptoms: [{ name: '턱 비율 이상이나 bite mismatch가 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      '기록에 jaw size anomaly만 있고 상악·하악·양악 중 어느 쪽인지 적혀 있지 않을 때 사용합니다.',
      '후속 기록에서 더 구체 subtype이 확인되면 해당 child code로 바꾸는 편이 좋습니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawSizeReferences,
  },
]

const jawRelationshipEntries: K07Config[] = [
  {
    code: 'K07.1',
    name_en: 'Anomalies of jaw-cranial base relationship',
    definition:
      'K07.1은 턱이 두개골 바닥과 맺는 위치 관계가 비정상적인 skeletal jaw relationship 범주입니다. 비대칭, 돌출, 후퇴 같은 방향성 문제를 포함합니다.',
    summary:
      'K07.1은 턱의 위치가 문제인 범주입니다. 치아만 삐뚤어진 경우와 달리, 턱이 앞이나 뒤로 치우치거나 좌우가 다를 수 있습니다.',
    anatomy: ['상악', '하악', '두개저', '안면 대칭'],
    symptoms: [
      { name: '얼굴 좌우가 다르게 보이거나 턱끝이 한쪽으로 치우쳐 보일 수 있습니다.' },
      { name: '턱이 앞으로 나와 보이거나 뒤로 들어가 보이는 profile 차이가 생길 수 있습니다.' },
    ],
    diagnostic: [
      '기록에 턱 비대칭, 하악 돌출, 상악 후퇴 같은 skeletal relationship 이상이 명시된 경우에 사용합니다.',
      'tooth-only malocclusion과 구분하려면 턱 자체 위치나 비율 평가가 적혀 있는지 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.10',
    name_en: 'Jaw asymmetry',
    definition:
      '턱이나 안면 골격이 좌우 대칭을 이루지 못하는 상태입니다. 한쪽 턱이 더 작거나, 턱끝이 한쪽으로 치우친 모습이 대표적입니다.',
    summary:
      'K07.10은 턱 비대칭이 핵심으로 기록된 경우입니다. 단순 midline shift보다 skeletal asymmetry에 더 가깝습니다.',
    anatomy: ['상악 또는 하악', '턱끝', '안면 좌우 대칭'],
    symptoms: [{ name: '턱끝이 한쪽으로 치우치거나 좌우 얼굴 크기가 달라 보일 수 있습니다.' }],
    diagnostic: [
      '턱 비대칭, facial asymmetry, 한쪽 턱 발육 차이 같은 표현이 명시된 경우에 사용합니다.',
      '치아 정중선만 약간 어긋난 정도라면 K07.26이 더 적합할 수 있습니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.11',
    name_en: 'Mandibular prognathism',
    definition:
      '하악이 상대적으로 앞으로 나온 skeletal jaw relationship입니다. underbite나 class III bite와 함께 보일 수 있습니다.',
    summary:
      'K07.11은 아랫턱이 앞으로 나온 상태입니다. 치아만 반대로 물리는 것보다 하악 위치가 전방인 것이 핵심입니다.',
    anatomy: ['하악', '턱끝', '교합 관계'],
    symptoms: [{ name: '턱끝이 앞으로 나와 보이거나 아래앞니가 위앞니보다 앞에 위치할 수 있습니다.' }],
    diagnostic: [
      '하악 돌출증, mandibular prognathism, prominent lower jaw가 명시된 경우에 사용합니다.',
      '단순 반대교합이라도 skeletal lower jaw prominence 언급이 없으면 K07.21을 먼저 고려합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.12',
    name_en: 'Maxillary prognathism',
    definition:
      '상악이 상대적으로 앞으로 나온 skeletal jaw relationship입니다. 전방 돌출된 윗턱이 얼굴 비율과 bite에 영향을 줄 수 있습니다.',
    summary:
      'K07.12는 윗턱이 앞으로 나온 상태입니다. 치아 돌출만이 아니라 상악 위치 자체가 전방인 경우에 씁니다.',
    anatomy: ['상악', '중안면', '교합 관계'],
    symptoms: [{ name: '윗입술과 위앞니 부위가 앞으로 도드라져 보일 수 있습니다.' }],
    diagnostic: [
      '상악 돌출증, maxillary prognathism, upper jaw prominence가 명시된 경우에 사용합니다.',
      '전치 돌출만 있는 경우에는 K07.22나 K07.3 계열이 더 적절할 수 있습니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.13',
    name_en: 'Mandibular retrognathism',
    definition:
      '하악이 뒤로 들어가 있거나 상대적으로 덜 발달해 보이는 skeletal jaw relationship입니다. class II profile과 함께 보일 수 있습니다.',
    summary:
      'K07.13은 아랫턱이 뒤로 들어간 상태입니다. 작은 턱처럼 보일 수 있지만, 여기서는 위치 관계가 핵심입니다.',
    anatomy: ['하악', '턱끝', '안면 옆모습'],
    symptoms: [{ name: '턱끝이 뒤로 들어가 보이거나 overjet이 커 보일 수 있습니다.' }],
    diagnostic: [
      '하악 후퇴증, retrognathia, recessive chin이 기록된 경우에 사용합니다.',
      '턱 크기 자체가 작다는 기록이면 K07.04와의 구분을 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.14',
    name_en: 'Maxillary retrognathism',
    definition:
      '상악이 뒤로 들어가 있거나 상대적으로 후퇴한 skeletal jaw relationship입니다. 중안면이 평평해 보이거나 반대교합처럼 보일 수 있습니다.',
    summary:
      'K07.14는 윗턱이 뒤로 들어간 상태입니다. 하악 돌출과 비슷하게 보일 수 있어 기록의 중심이 무엇인지 확인해야 합니다.',
    anatomy: ['상악', '중안면', '교합 관계'],
    symptoms: [{ name: '중안면이 평평해 보이거나 앞니 관계가 반대로 보일 수 있습니다.' }],
    diagnostic: [
      '상악 후퇴증, maxillary retrusion, midface retrusion이 명시된 경우에 사용합니다.',
      '반대교합이 있더라도 상악 후퇴인지 하악 돌출인지 구분 기록을 확인합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.18',
    name_en: 'Other specified anomaly of jaw-cranial base relationship',
    definition:
      '턱-두개저 관계 이상이 분명하지만 K07.10~K07.14의 named pattern으로 딱 분류되지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.18은 턱 위치 관계 이상이 분명하지만 비대칭, 돌출, 후퇴 중 어느 하나로 딱 정리되지 않을 때 쓰는 코드입니다.',
    anatomy: ['상악 또는 하악', '두개저 관계'],
    symptoms: [{ name: 'bite mismatch나 facial imbalance가 구체적으로 기록될 수 있습니다.' }],
    diagnostic: [
      'skeletal jaw relationship anomaly가 명시돼 있고 named subtype과 다를 때 사용합니다.',
      '막연한 부정교합이나 vague jaw problem만 있으면 unspecified 쪽이 더 안전합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
  {
    code: 'K07.19',
    name_en: 'Anomaly of jaw-cranial base relationship, unspecified',
    definition:
      '턱-두개저 관계 이상이 있다는 정보는 있지만, 비대칭인지 돌출인지 후퇴인지 세부 방향이 적혀 있지 않은 상태입니다.',
    summary:
      'K07.19는 턱 위치 관계 이상이 있다고만 적혀 있고 세부 subtype이 없는 경우의 fallback 코드입니다.',
    anatomy: ['상악 또는 하악', '두개저 관계'],
    symptoms: [{ name: '얼굴 비율 또는 교합 이상이 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      'jaw-cranial base anomaly만 있고 세부 패턴이 없는 경우에 사용합니다.',
      '더 자세한 profile 분석이나 수술 계획 기록이 생기면 구체 child code로 바꾸는 편이 좋습니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: jawRelationshipReferences,
  },
]

const archRelationshipEntries: K07Config[] = [
  {
    code: 'K07.2',
    name_en: 'Anomalies of dental arch relationship',
    definition:
      'K07.2는 위아래 치열궁이 서로 맞물리는 방식 자체가 비정상적인 bite-pattern 범주입니다. class II, class III, overjet, open bite, crossbite 같은 관계 이상이 여기에 들어갑니다.',
    summary:
      'K07.2는 위아래 치열궁이 서로 어떻게 물리는지의 문제입니다. crowding처럼 개별 치아 위치보다 교합 패턴 자체가 핵심입니다.',
    etiology: [
      '위턱과 아래턱(치열궁)이 정상적으로 정렬되지 않아 생기는 관계 이상',
      '치열궁 관계의 불일치로 나타나는 비정상 교합 패턴',
    ],
    anatomy: ['상악 치열궁', '하악 치열궁', '전치와 구치 교합'],
    symptoms: [
      { name: '위아래 치아가 잘 맞지 않아 씹기 불편하거나 닫을 때 특정 부위만 먼저 닿을 수 있습니다.' },
      { name: '앞니가 너무 튀어나오거나, 깊게 덮이거나, 반대로 닿지 않는 양상이 나타날 수 있습니다.' },
    ],
    diagnostic: [
      '기록에 class II/III, overjet, deep bite, open bite, crossbite 같은 arch relationship 명칭이 있을 때 사용합니다.',
      '문제가 주로 개별 치아 위치라면 K07.3, 턱뼈 비율이면 K07.0~K07.1을 먼저 고려합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.20',
    name_en: 'Disto-occlusion',
    definition:
      '하악 치열궁이 상대적으로 뒤에 위치해 class II arch relationship으로 보이는 상태입니다. 흔히 overjet 증가와 함께 나타날 수 있습니다.',
    summary:
      'K07.20은 아래 치열궁이 뒤로 물리는 class II 패턴입니다. 윗니가 많이 나와 보일 수 있지만 핵심은 arch relationship입니다.',
    anatomy: ['상악 치열궁', '하악 치열궁', '전치부 교합'],
    symptoms: [{ name: '윗앞니가 상대적으로 더 튀어나와 보이거나 bite가 뒤로 밀린 느낌이 있을 수 있습니다.' }],
    diagnostic: [
      '원심교합, disto-occlusion, class II 관계가 명시된 경우에 사용합니다.',
      '수평 피개만 강조된 경우에는 K07.22가 더 직접적일 수 있습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.21',
    name_en: 'Mesio-occlusion',
    definition:
      '하악 치열궁이 상대적으로 앞에 위치해 class III arch relationship으로 보이는 상태입니다. underbite와 겹쳐 보일 수 있습니다.',
    summary:
      'K07.21은 아래 치열궁이 앞으로 물리는 class III 패턴입니다. 턱 위치 문제와 겹칠 수 있어 기록 중심을 확인해야 합니다.',
    anatomy: ['상악 치열궁', '하악 치열궁', '전치부 교합'],
    symptoms: [{ name: '아래앞니가 위앞니보다 앞에 위치하거나 반대교합처럼 보일 수 있습니다.' }],
    diagnostic: [
      '근심교합, mesio-occlusion, class III arch relationship이 명시된 경우에 사용합니다.',
      '하악 돌출증처럼 턱뼈 위치가 핵심이면 K07.11과의 구분을 확인합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.22',
    name_en: 'Excessive overjet',
    definition:
      '윗앞니가 아랫앞니보다 수평으로 과하게 앞으로 나와 있는 상태입니다. class II pattern의 일부일 수 있지만 overjet 자체를 별도로 적을 때 사용합니다.',
    summary:
      'K07.22는 앞니가 수평으로 많이 튀어나온 상태입니다. deep bite와 달리 앞니가 얼마나 앞으로 나왔는지가 핵심입니다.',
    anatomy: ['상악 전치', '하악 전치', '전치부 수평 관계'],
    symptoms: [{ name: '위앞니가 앞으로 튀어나와 보이거나 입술 닫기가 불편할 수 있습니다.' }],
    diagnostic: [
      '과도한 상치돌출, excessive overjet, horizontal overbite가 명시된 경우에 사용합니다.',
      'class II라는 말만 있고 overjet을 별도로 강조하지 않으면 K07.20을 우선 고려합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.23',
    name_en: 'Excessive overbite',
    definition:
      '윗앞니가 아랫앞니를 수직으로 과하게 덮는 deep bite 상태입니다. 앞니 마모나 잇몸 접촉과 연결될 수 있습니다.',
    summary:
      'K07.23은 앞니가 세로 방향으로 너무 깊게 겹치는 상태입니다. 수평 돌출보다 수직 피개가 핵심입니다.',
    anatomy: ['상악 전치', '하악 전치', '전치부 수직 관계'],
    symptoms: [{ name: '윗앞니가 아랫앞니를 깊게 덮어 아래앞니가 잘 안 보일 수 있습니다.' }],
    diagnostic: [
      '과도한 피개교합, deep bite, vertical overbite가 명시된 경우에 사용합니다.',
      '수평 돌출이 주된 문제라면 K07.22를 먼저 고려합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.24',
    name_en: 'Open bite',
    definition:
      '입을 다물어도 앞니나 일부 치아가 서로 닿지 않아 공간이 남는 bite pattern입니다. 전치부 또는 구치부에서 보일 수 있습니다.',
    summary:
      'K07.24는 치아를 다물어도 일부가 닿지 않는 개방교합입니다. 손가락 빨기나 혀 습관이 함께 언급될 수도 있습니다.',
    anatomy: ['상악 치열궁', '하악 치열궁', '전치 또는 구치 교합'],
    symptoms: [{ name: '앞니 사이가 벌어져 보이거나, 닫을 때 어금니만 먼저 닿을 수 있습니다.' }],
    diagnostic: [
      '개방교합, open bite가 명시된 경우에 사용합니다.',
      '입호흡이나 손가락 빨기 같은 원인이 주로 강조되면 K07.5 child code와 함께 기록 의미를 살핍니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.25',
    name_en: 'Crossbite',
    definition:
      '위치상 윗니가 아랫니 바깥쪽에 있어야 하는데 반대로 안쪽으로 물리는 crossbite 상태입니다. 전치부 또는 후치부에서 나타날 수 있습니다.',
    summary:
      'K07.25는 앞니나 어금니가 반대로 물리는 교차교합입니다. 한쪽만 나타나면 턱이 옆으로 미끄러져 닫히는 느낌이 있을 수 있습니다.',
    anatomy: ['상악 치열궁', '하악 치열궁', '전치 또는 구치 교합'],
    symptoms: [{ name: '닫을 때 한쪽으로 턱이 밀리거나, 앞니 또는 어금니가 반대로 맞물릴 수 있습니다.' }],
    diagnostic: [
      '교차교합, anterior crossbite, posterior crossbite가 명시된 경우에 사용합니다.',
      'skeletal jaw asymmetry가 핵심이면 K07.10 쪽을 먼저 확인합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.26',
    name_en: 'Midline deviation',
    definition:
      '위아래 치열의 중심선이 맞지 않아 정중선이 어긋난 상태입니다. 치아 배열, 비대칭, 편위성 닫힘과 함께 나타날 수 있습니다.',
    summary:
      'K07.26은 치열 중심선이 맞지 않는 상태입니다. 단순 cosmetic issue처럼 보여도 bite guidance와 연결될 수 있습니다.',
    anatomy: ['상악 정중선', '하악 정중선', '전치부 배열'],
    symptoms: [{ name: '윗니와 아랫니 중심선이 서로 맞지 않아 웃을 때 비대칭처럼 보일 수 있습니다.' }],
    diagnostic: [
      '정중편위, midline deviation이 명시된 경우에 사용합니다.',
      '실제 skeletal asymmetry가 주된 문제이면 K07.10을 먼저 고려합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.27',
    name_en: 'Posterior lingual occlusion of mandibular teeth',
    definition:
      '하악 후치가 비정상적으로 혀쪽 위치 관계로 물리는 매우 구체적인 후방 교합 이상입니다. 일반적인 crowding이나 midline shift만으로는 설명되지 않습니다.',
    summary:
      'K07.27은 하악 어금니 쪽의 매우 특정한 후방 교합 이상입니다. 기록에 공식 용어나 동등한 설명이 있을 때만 보수적으로 쓰는 편이 안전합니다.',
    anatomy: ['하악 후치', '상악 후치', '후방 교합 관계'],
    symptoms: [{ name: '어금니 쪽 bite가 비정상적으로 안쪽으로 맞물려 씹을 때 불편할 수 있습니다.' }],
    diagnostic: [
      '하악 후치부의 후방혀 관계 또는 이에 준하는 명확한 공식 설명이 있을 때만 사용합니다.',
      '일반적인 posterior crossbite나 crowding는 K07.25 또는 K07.3으로 분류하는 편이 더 안전합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.28',
    name_en: 'Other specified anomaly of dental arch relationship',
    definition:
      '치열궁 관계 이상이 분명하지만 K07.20~K07.27의 named pattern으로는 딱 맞지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.28은 위아래 arch relationship 문제가 분명히 적혀 있지만 전형적 subtype으로 정리되지 않을 때 쓰는 코드입니다.',
    anatomy: ['상악 치열궁', '하악 치열궁'],
    symptoms: [{ name: 'bite pattern 이상이 구체적으로 적혀 있으나 named subtype과 완전히 일치하지 않을 수 있습니다.' }],
    diagnostic: [
      '구체적인 arch relationship anomaly가 기록돼 있고 named subtype과 다를 때 사용합니다.',
      '막연한 malocclusion만 있으면 K07.29 또는 K07.4가 더 적합할 수 있습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
  {
    code: 'K07.29',
    name_en: 'Anomaly of dental arch relationship, unspecified',
    definition:
      '치열궁 관계 이상이 있다는 정보는 있지만 class II, open bite, crossbite 같은 세부 패턴은 적혀 있지 않은 상태입니다.',
    summary:
      'K07.29는 bite pattern 이상이 있다고만 적혀 있고 세부 교합 양상이 없는 경우의 fallback 코드입니다.',
    anatomy: ['상악 치열궁', '하악 치열궁'],
    symptoms: [{ name: '위아래 치아가 잘 맞지 않는다는 vague한 설명이 기록될 수 있습니다.' }],
    diagnostic: [
      'arch relationship anomaly만 있고 세부 pattern이 없을 때 사용합니다.',
      '후속 기록에서 overjet, crossbite, open bite 등이 확인되면 더 구체 code로 바꾸는 편이 좋습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: archRelationshipReferences,
  },
]

const toothPositionEntries: K07Config[] = [
  {
    code: 'K07.3',
    name_en: 'Anomalies of tooth position',
    definition:
      'K07.3은 개별 치아가 arch 안에서 차지하는 위치, 방향, 간격이 비정상적인 범주입니다. crowding, rotation, spacing, displacement, 매복과 연관된 위치 이상이 포함됩니다.',
    summary:
      'K07.3은 치아 하나하나의 자리 문제를 뜻합니다. 위아래 arch relationship보다 개별 치아의 겹침, 회전, 간격, 매복 쪽이 핵심입니다.',
    pathophysiology:
      '개별 치아의 위치 이상으로, 공간이 부족하면 치아가 겹치거나 비틀리고, 공간이 남으면 간격이 벌어지며, 매복·회전된 치아가 이웃 치아의 위치를 흐트러뜨릴 수 있습니다.',
    etiology: [
      '공간 부족(총생)',
      '결손치·과잉치·매복치',
      '손가락 빨기나 혀 내밀기 같은 습관',
      '턱 크기와 치아 크기의 불일치',
    ],
    risk_factors: [
      '손가락 빨기·혀 내밀기 같은 습관',
      '결손치·과잉치·매복치가 있는 경우',
      '턱과 치아 크기의 불일치',
    ],
    anatomy: ['개별 치아', '치열궁 공간', '맹출 경로'],
    symptoms: [
      { name: '치아가 겹치거나 돌아가 있거나, 사이가 벌어져 보일 수 있습니다.' },
      { name: '맹출이 늦거나 예상 위치가 아닌 곳으로 나오는 문제가 함께 보일 수 있습니다.' },
    ],
    diagnostic: [
      'crowding, spacing, displacement, rotation, impacted tooth with malposition 같은 tooth-position note가 있으면 사용합니다.',
      '문제가 주로 위아래 bite pattern이면 K07.2, 턱뼈 비율이면 K07.0~K07.1을 우선합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.30',
    name_en: 'Crowding',
    definition:
      '치열궁 안에 공간이 부족해 치아가 겹치거나 삐뚤어져 나오는 상태입니다. blocked-out tooth와 overlap이 대표적입니다.',
    summary:
      'K07.30은 공간 부족으로 치아가 겹쳐 나는 crowding입니다. 가장 흔한 tooth-position anomaly 중 하나입니다.',
    anatomy: ['치열궁 공간', '개별 치아 배열'],
    symptoms: [{ name: '치아가 서로 겹치거나 한 치아가 바깥이나 안쪽으로 밀려날 수 있습니다.' }],
    diagnostic: [
      '과밀, crowding, overlap, blocked-out tooth가 명시된 경우에 사용합니다.',
      'jaw size mismatch가 주로 강조되면 K07.0~K07.2와의 관련도도 함께 살핍니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.31',
    name_en: 'Displacement of tooth',
    definition:
      '치아가 정상 arch line에서 벗어나 전방, 후방, 협측, 설측 등 다른 방향으로 자리잡은 상태입니다.',
    summary:
      'K07.31은 치아가 제자리에서 벗어난 displacement를 뜻합니다. crowding과 겹칠 수 있지만, 위치 이탈 자체가 핵심입니다.',
    anatomy: ['개별 치아', '치열궁 line of arch'],
    symptoms: [{ name: '한 치아가 밖으로 튀어나오거나 안쪽으로 들어가 보여 bite가 불편할 수 있습니다.' }],
    diagnostic: [
      '전위, displacement, tooth out of alignment가 명시된 경우에 사용합니다.',
      '회전이 핵심이면 K07.32, spacing이면 K07.33을 우선합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.32',
    name_en: 'Rotation of tooth',
    definition:
      '치아가 긴 축을 따라 돌아가 있는 상태입니다. 공간 부족과 함께 나타나는 경우가 많습니다.',
    summary:
      'K07.32는 치아가 제자리에서 돌아간 회전을 뜻합니다. crowding과 비슷해 보여도 방향 변화가 핵심입니다.',
    anatomy: ['개별 치아', '치아 장축', '치열궁 공간'],
    symptoms: [{ name: '치아 면이 정면이 아니라 비틀어져 보여 청소와 배열이 불편할 수 있습니다.' }],
    diagnostic: [
      '회전, rotated tooth, turned tooth가 명시된 경우에 사용합니다.',
      '단순 위치 이탈만 있으면 K07.31을 먼저 고려합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.33',
    name_en: 'Spacing',
    definition:
      '치아 사이 간격이 과하게 벌어진 상태입니다. missing tooth, 작은 치아, 넓은 arch와 연관될 수 있습니다.',
    summary:
      'K07.33은 치아 사이가 벌어진 spacing입니다. 간격이 cosmetic 문제처럼 보여도 bite guidance와 연결될 수 있습니다.',
    anatomy: ['전치 또는 구치 사이 공간', '치열궁 길이'],
    symptoms: [{ name: '치아 사이가 벌어져 음식이 끼거나 웃을 때 간격이 눈에 띌 수 있습니다.' }],
    diagnostic: [
      '간격, spacing, diastema가 명시된 경우에 사용합니다.',
      '결손치나 과잉치가 원인으로 따로 기록되면 K00 또는 K01 코드와 함께 맥락을 확인합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.34',
    name_en: 'Displacement of tooth (duplicate hierarchy label)',
    definition:
      '공식 hierarchy에서 K07.31과 중복되어 보이는 전위 label을 유지한 코드입니다. 임상적으로는 displacement 개념을 다시 한 번 담고 있습니다.',
    summary:
      'K07.34는 공식 구조상 K07.31과 비슷한 전위 코드입니다. 데이터 정합성을 위해 유지하되, 실제 의미는 displacement에 가깝게 보는 것이 안전합니다.',
    anatomy: ['개별 치아', '치열궁 line of arch'],
    symptoms: [{ name: '치아가 정상 배열선에서 벗어난 모습이 기록될 수 있습니다.' }],
    diagnostic: [
      '원문 구조를 그대로 유지해야 할 때 쓰는 duplicate displacement 코드입니다.',
      '임상 기록이 단순 displacement라면 K07.31과 의미가 겹칠 수 있음을 주석으로 남기는 편이 안전합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.35',
    name_en: 'Impacted or embedded tooth with malposition',
    definition:
      '매몰치 또는 매복치가 비정상 위치나 방향을 동반한 상태입니다. 공간 부족이나 이상 맹출 경로와 연결될 수 있습니다.',
    summary:
      'K07.35는 매복·매몰된 치아가 위치 이상까지 함께 보일 때 쓰는 코드입니다. 사랑니뿐 아니라 다른 치아에서도 보일 수 있습니다.',
    anatomy: ['매복 또는 매몰 치아', '맹출 경로', '인접 치아 위치'],
    symptoms: [
      { name: '통증 없이 X-ray에서 발견되거나, 인접 치아 배열을 밀어낼 수 있습니다.', severity: 'mild' },
      { name: '잇몸 불편, 염증, 인접 치아 압박이 동반될 수 있습니다.' },
    ],
    diagnostic: [
      '위치이상을 동반한 매복치 또는 매몰치가 명시된 경우에 사용합니다.',
      '단순 매복치 자체는 K01 계열과의 경계를 같이 확인합니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.38',
    name_en: 'Other specified anomaly of tooth position',
    definition:
      '치아 위치 이상이 분명하지만 K07.30~K07.35의 named pattern으로 딱 맞지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.38은 tooth-position anomaly가 구체적으로 적혀 있지만, crowding·rotation·spacing 등 전형 코드와 완전히 일치하지 않을 때 쓰는 코드입니다.',
    anatomy: ['개별 치아', '치열궁 배열'],
    symptoms: [{ name: '비전형적이지만 분명한 치아 위치 이상이 기록될 수 있습니다.' }],
    diagnostic: [
      'specified tooth-position anomaly가 있으나 named subtype과 다를 때 사용합니다.',
      '막연한 malocclusion만 있으면 K07.39 또는 K07.4가 더 적합할 수 있습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
  {
    code: 'K07.39',
    name_en: 'Anomaly of tooth position, unspecified',
    definition:
      '치아 위치 이상이 있다는 정보는 있지만 crowding, spacing, rotation 같은 구체 subtype이 적혀 있지 않은 상태입니다.',
    summary:
      'K07.39는 tooth-position anomaly가 있다고만 적혀 있고 구체 pattern이 없는 경우의 fallback 코드입니다.',
    anatomy: ['개별 치아', '치열궁 배열'],
    symptoms: [{ name: '치아 배열 이상이 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      'tooth-position anomaly만 있고 세부 유형이 없을 때 사용합니다.',
      '후속 기록에서 crowding, rotation, spacing이 확인되면 더 구체 code로 바꾸는 편이 좋습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: toothPositionReferences,
  },
]

const functionalEntries: K07Config[] = [
  {
    code: 'K07.5',
    name_en: 'Functional dentofacial anomalies',
    definition:
      'K07.5는 bite 문제의 원인이 치아 배열 자체보다 입을 쓰는 방식, 삼킴, 호흡, 습관 같은 기능에 연결된 범주입니다.',
    summary:
      'K07.5는 손가락 빨기, 입호흡, 혀 습관처럼 기능적 원인이 bite에 영향을 준 경우를 뜻합니다. 기능 원인을 함께 다뤄야 재발을 줄이기 쉽습니다.',
    anatomy: ['입술과 혀', '상·하악 치열궁', '비강과 기도'],
    symptoms: [
      { name: '개방교합, 전치 돌출, 비정상적인 삼킴 패턴이 함께 보일 수 있습니다.' },
      { name: '입을 자주 벌리고 있거나 혀를 미는 습관이 관찰될 수 있습니다.', severity: 'mild' },
    ],
    diagnostic: [
      '기록에 swallow pattern, mouth breathing, thumb sucking 같은 기능 원인이 bite와 연결돼 있을 때 사용합니다.',
      '원인 연결이 없고 단순 crowding만 있으면 K07.2 또는 K07.3이 더 적합합니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.50',
    name_en: 'Jaw closure anomaly',
    definition:
      '입을 다물 때 턱의 닫힘 경로나 닫힌 위치가 비정상적인 기능 이상입니다. 치아 맞물림뿐 아니라 closing pattern 자체가 문제입니다.',
    summary:
      'K07.50은 턱이 닫히는 방식 자체가 문제로 적힌 경우입니다. 단순 open bite와 달리 기능적 closing pattern에 초점이 있습니다.',
    anatomy: ['하악 운동 경로', '교합 접촉', '저작근'],
    symptoms: [{ name: '입을 다물 때 턱이 옆이나 앞쪽으로 미끄러져 닫히거나, 일부 치아만 먼저 닿을 수 있습니다.' }],
    diagnostic: [
      '턱닫힘이상, abnormal jaw closure, deflective closure가 명시된 경우에 사용합니다.',
      '구체적 arch relationship만 적혀 있으면 K07.2 쪽이 더 직접적일 수 있습니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.51',
    name_en: 'Malocclusion due to swallowing abnormality',
    definition:
      '비정상적인 삼킴 습관이나 tongue thrust가 bite pattern 형성에 영향을 준 상태입니다. 앞니 개방교합과 함께 기록될 수 있습니다.',
    summary:
      'K07.51은 삼키는 방식이 bite에 영향을 준 경우입니다. 혀를 앞으로 미는 삼킴 습관이 대표 예입니다.',
    anatomy: ['혀', '전치부 교합', '구강 근기능'],
    symptoms: [{ name: '삼킬 때 혀가 앞으로 밀리거나 앞니 사이로 나오는 습관이 관찰될 수 있습니다.' }],
    diagnostic: [
      '삼킴이상, tongue thrust swallow, swallowing abnormality가 malocclusion 원인으로 명시된 경우에 사용합니다.',
      '혀 습관만 vague하게 적혀 있으면 K07.53과의 구분을 확인합니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.52',
    name_en: 'Malocclusion due to mouth breathing',
    definition:
      '코 대신 입으로 숨 쉬는 패턴이 지속되면서 bite와 dentofacial growth에 영향을 준 상태입니다. 코막힘, 큰 아데노이드와 연결될 수 있습니다.',
    summary:
      'K07.52는 구호흡이 bite 문제의 원인으로 연결된 경우입니다. 아이가 늘 입을 벌리고 자거나 코막힘이 심한 경우와 함께 기록될 수 있습니다.',
    anatomy: ['비강과 아데노이드', '입술', '상·하악 치열궁'],
    symptoms: [{ name: '평소 입을 벌리고 있거나, 코막힘과 함께 bite 변화가 기록될 수 있습니다.' }],
    diagnostic: [
      '입호흡, mouth breathing이 malocclusion의 기능적 원인으로 명시된 경우에 사용합니다.',
      '단순 코막힘만 있고 bite 연관이 없으면 이 코드로 바로 연결하지 않습니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.53',
    name_en: 'Malocclusion due to tongue, lip, or finger habits',
    definition:
      '혀, 입술, 손가락, 젖꼭지 같은 반복 습관이 치열과 bite 형성에 영향을 준 상태입니다. thumb sucking이 대표적입니다.',
    summary:
      'K07.53은 손가락 빨기, 입술 빨기, 혀 습관 같은 구강 습관이 bite를 바꾼 경우입니다. 습관 교정 없이는 orthodontic relapse 위험이 남을 수 있습니다.',
    anatomy: ['입술', '혀', '전치부 교합', '치열궁'],
    symptoms: [{ name: '앞니 돌출이나 개방교합과 함께 thumb sucking 또는 구강 습관이 기록될 수 있습니다.' }],
    diagnostic: [
      '혀, 입술, 손가락 습관 또는 prolonged dummy use가 malocclusion 원인으로 명시된 경우에 사용합니다.',
      '단순 open bite만 있고 습관 연결이 없으면 K07.24가 더 직접적일 수 있습니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.58',
    name_en: 'Other specified functional dentofacial anomaly',
    definition:
      '기능성 dentofacial anomaly가 분명하지만 K07.50~K07.53의 named pattern과 완전히 일치하지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.58은 기능적 원인이 분명히 적혀 있지만, 턱닫힘·삼킴·구호흡·구강습관 중 하나로 딱 분류되지 않을 때 쓰는 코드입니다.',
    anatomy: ['구강 근기능', '치열궁', '교합'],
    symptoms: [{ name: '기능과 연관된 bite 변화가 구체적으로 적혀 있을 수 있습니다.' }],
    diagnostic: [
      'specified functional dentofacial anomaly가 있으나 named subtype과 다를 때 사용합니다.',
      '애매한 경우 unspecified보다 specified 기타 코드를 쓰려면 원인 설명이 기록에 있어야 합니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
  {
    code: 'K07.59',
    name_en: 'Functional dentofacial anomaly, unspecified',
    definition:
      '기능성 dentofacial anomaly가 있다는 정보는 있지만, 삼킴인지 입호흡인지 습관인지 세부 원인이 적혀 있지 않은 상태입니다.',
    summary:
      'K07.59는 기능적 bite 문제라고만 적혀 있고 원인 subtype이 없는 경우의 fallback 코드입니다.',
    anatomy: ['구강 근기능', '교합'],
    symptoms: [{ name: 'bite 문제와 기능 이상이 vague하게 연결돼 기록될 수 있습니다.' }],
    diagnostic: [
      'functional dentofacial anomaly만 있고 세부 원인이 없을 때 사용합니다.',
      '후속 평가에서 swallow pattern, mouth breathing, habit이 명확해지면 child code를 더 구체화합니다.',
    ],
    treatment: functionalEvaluation,
    references: functionalReferences,
  },
]

const tmdChildEntries: K07Config[] = [
  {
    code: 'K07.60',
    name_en: 'Internal derangement of temporomandibular joint',
    definition:
      '턱관절 디스크 위치 이상이나 internal derangement가 중심인 상태입니다. clicking, locking, opening limitation과 함께 기록될 수 있습니다.',
    summary:
      'K07.60은 턱관절 안쪽 구조, 특히 디스크 위치 이상이 핵심인 경우입니다. 소리만 있는 경우보다 구조 문제에 더 가깝습니다.',
    anatomy: ['턱관절 디스크', '과두', '관절와'],
    symptoms: [
      { name: '입 벌릴 때 딱딱 소리와 함께 잠기거나, 개구 범위가 줄어들 수 있습니다.' },
      { name: '관절 앞쪽 통증이나 걸리는 느낌이 동반될 수 있습니다.', severity: 'mild' },
    ],
    diagnostic: [
      '디스크 변위, internal derangement, slipped disc가 명시된 경우에 사용합니다.',
      '단순 clicking만 있고 구조 진단이 없으면 K07.61이 더 적합할 수 있습니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.61',
    name_en: 'Temporomandibular joint noise',
    definition:
      '턱관절에서 clicking, popping, cracking 같은 잡음이 주된 finding으로 기록된 상태입니다.',
    summary:
      'K07.61은 턱관절 소리가 주된 문제로 적힌 경우입니다. 통증 없는 소리는 정상 변이일 수도 있어 기록 맥락이 중요합니다.',
    anatomy: ['턱관절', '관절 디스크', '과두 움직임'],
    symptoms: [{ name: '입을 벌리거나 씹을 때 딱딱거리거나 튀는 소리가 날 수 있습니다.' }],
    diagnostic: [
      '턱관절잡음, clicking, popping, joint noise가 main finding으로 명시된 경우에 사용합니다.',
      '통증이나 잠김이 더 중심이면 다른 TMD child code와의 구분을 확인합니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.62',
    name_en: 'Recurrent dislocation or subluxation of temporomandibular joint',
    definition:
      '턱관절이 반복적으로 빠지거나 아탈구되는 상태입니다. 크게 입 벌린 뒤 제자리로 잘 안 돌아오는 episodes가 대표적입니다.',
    summary:
      'K07.62는 턱이 자주 빠지거나 반쯤 빠지는 문제가 반복될 때 쓰는 코드입니다. 하품이나 크게 벌린 뒤 악화될 수 있습니다.',
    anatomy: ['턱관절', '과두', '관절 결절'],
    symptoms: [
      { name: '입을 크게 벌린 뒤 턱이 제자리로 잘 안 돌아오거나 잠기는 episode가 반복될 수 있습니다.' },
      { name: '통증, 불안감, 입 다물기 어려움이 동반될 수 있습니다.' },
    ],
    diagnostic: [
      '재발성 탈구, recurrent dislocation, subluxation이 명시된 경우에 사용합니다.',
      '일회성 episode만 vague하게 적혀 있으면 추가 기록을 확인하는 편이 안전합니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.63',
    name_en: 'Temporomandibular joint pain, not elsewhere classified',
    definition:
      '구조적 subtype이 뚜렷하지 않지만 턱관절 자체의 통증이 중심으로 기록된 상태입니다. arthralgia나 TMJ pain NOS가 여기에 가깝습니다.',
    summary:
      'K07.63은 턱관절 통증이 main diagnosis일 때 쓰는 코드입니다. 근육통과 구분 기록이 있으면 더 정확합니다.',
    anatomy: ['턱관절', '관절 주위 인대'],
    symptoms: [{ name: '귓앞이나 관절 부위 통증이 씹거나 입 벌릴 때 심해질 수 있습니다.' }],
    diagnostic: [
      'TMJ pain, arthralgia, 관절통이 구조 subtype 없이 명시된 경우에 사용합니다.',
      '저작근 통증이 중심이면 K07.66이 더 적합할 수 있습니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.64',
    name_en: 'Temporomandibular joint stiffness',
    definition:
      '턱관절이 뻣뻣하거나 잘 안 벌어지고 잠기는 느낌이 중심인 상태입니다. locking이나 limited opening과 겹쳐 기록될 수 있습니다.',
    summary:
      'K07.64는 턱관절 경직이나 개구 제한이 주된 문제일 때 쓰는 코드입니다. internal derangement와 겹칠 수 있어 문맥 확인이 중요합니다.',
    anatomy: ['턱관절', '개구 운동 범위', '관절 주위 조직'],
    symptoms: [{ name: '입이 뻣뻣하고 크게 벌리기 어렵거나 잠기는 느낌이 반복될 수 있습니다.' }],
    diagnostic: [
      '턱관절 경직, limited opening, joint stiffness가 명시된 경우에 사용합니다.',
      '디스크 변위나 탈구가 명확하면 더 구체적인 child code를 우선합니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.65',
    name_en: 'Degenerative arthritis of temporomandibular joint',
    definition:
      '턱관절의 퇴행성 관절염이나 퇴행성 변화가 중심인 상태입니다. 통증, 마찰음, 구조 변화가 함께 보일 수 있습니다.',
    summary:
      'K07.65는 턱관절 퇴행성관절염이 기록된 경우입니다. 단순 소리보다 구조적 퇴행 변화가 핵심입니다.',
    anatomy: ['턱관절 연골', '과두', '관절면'],
    symptoms: [{ name: '씹을 때 통증, 마찰감, 점진적 개구 불편이 생길 수 있습니다.' }],
    diagnostic: [
      '퇴행성관절염, degenerative arthritis, osteoarthritic change of TMJ가 명시된 경우에 사용합니다.',
      '영상 소견이나 specialist assessment가 함께 적힌 경우가 많습니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.66',
    name_en: 'Disorder of muscles of mastication',
    definition:
      '문제의 중심이 턱관절 자체보다 저작근과 myofascial pain인 상태입니다. 이악물기, 압통, 근육 피로감과 함께 기록될 수 있습니다.',
    summary:
      'K07.66은 씹는 근육 쪽 문제가 중심일 때 쓰는 코드입니다. 관절 소리보다 근육 통증과 피로가 더 앞서는 경우가 많습니다.',
    anatomy: ['저작근', '측두근', '교근', '하악 운동'],
    symptoms: [{ name: '턱 주변 근육이 뻐근하거나 눌렀을 때 아프고, 오래 씹으면 피로해질 수 있습니다.' }],
    diagnostic: [
      '저작근 장애, myofascial pain, muscle-related TMD가 명시된 경우에 사용합니다.',
      '관절 자체 소견이 중심이면 K07.60~K07.65 쪽을 우선합니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.68',
    name_en: 'Other specified temporomandibular disorder',
    definition:
      '턱관절장애가 분명하지만 K07.60~K07.66의 named pattern으로는 딱 맞지 않는 경우를 위한 기타 명시 코드입니다.',
    summary:
      'K07.68은 TMJ disorder가 구체적으로 적혀 있지만 named subtype과 완전히 일치하지 않을 때 쓰는 코드입니다.',
    anatomy: ['턱관절 또는 저작근'],
    symptoms: [{ name: '구체적인 TMJ disorder가 기록되지만 named subtype과 다를 수 있습니다.' }],
    diagnostic: [
      'specified TMJ disorder가 있으나 named subtype과 다를 때 사용합니다.',
      '애매한 경우 unspecified보다 specified 기타 코드를 쓰려면 진단명이 어느 정도 구체적이어야 합니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
  {
    code: 'K07.69',
    name_en: 'Temporomandibular disorder, unspecified',
    definition:
      '턱관절장애가 있다는 정보는 있지만 internal derangement, muscle disorder, arthritis 같은 세부 subtype이 적혀 있지 않은 상태입니다.',
    summary:
      'K07.69는 TMD가 있다고만 적혀 있고 세부 subtype이 없는 경우의 fallback 코드입니다.',
    anatomy: ['턱관절 또는 저작근'],
    symptoms: [{ name: '턱 통증, 소리, 개구 불편 같은 TMD symptoms가 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      'TMJ disorder, TMD, 턱관절장애 NOS가 명시된 경우에 사용합니다.',
      '후속 기록에서 pain, noise, disc, muscle subtype이 확인되면 더 구체 code로 바꾸는 편이 좋습니다.',
    ],
    treatment: tmdConservativeTreatment,
    references: tmdReferences,
  },
]

const miscEntries: K07Config[] = [
  {
    code: 'K07.4',
    name_en: 'Malocclusion, unspecified',
    definition:
      '부정교합이 있다는 정보는 있지만 arch relationship, tooth position, 기능 원인 같은 세부 pattern이 적혀 있지 않은 상태입니다.',
    summary:
      'K07.4는 기록에 그냥 부정교합이라고만 적혀 있을 때 쓰는 fallback 코드입니다. 더 구체 정보가 생기면 K07.2나 K07.3으로 세분화하는 편이 좋습니다.',
    pathophysiology:
      '위아래 치아가 제대로 맞물리지 않는 상태로, 과개교합·반대교합·개방교합·교차교합·총생·공극 등 여러 양상으로 나타날 수 있습니다.',
    anatomy: ['전반적 교합 관계', '상·하악 치열궁'],
    symptoms: [{ name: '씹을 때 불편하거나 치아가 고르게 닿지 않는 느낌이 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      'malocclusion NOS 또는 unspecified malocclusion이 명시된 경우에 사용합니다.',
      'crowding, open bite, crossbite 등 subtype이 명확하면 더 구체 코드로 분류합니다.',
    ],
    treatment: orthodonticEvaluation,
    prognosis:
      '경미한 부정교합은 치료가 필요 없는 경우가 많지만, 중등도 이상은 씹기, 청결 관리, 법랑질 마모, 턱·근육 부담에 영향을 줄 수 있습니다.',
    references: unspecifiedMalocclusionReferences,
  },
  {
    code: 'K07.8',
    name_en: 'Other dentofacial anomalies',
    definition:
      'dentofacial anomaly가 분명하지만 턱 크기, 턱 위치, arch relationship, tooth position, 기능 이상, TMD 어느 한 subgroup으로도 깔끔하게 들어가지 않는 경우입니다.',
    summary:
      'K07.8은 분명한 dentofacial anomaly가 기록됐지만 기존 하위 묶음으로 정리되지 않을 때 쓰는 기타 명시 코드입니다.',
    anatomy: ['안면 골격', '교합', '치열궁'],
    symptoms: [{ name: '구체적인 dentofacial imbalance가 기록되지만 named subgroup과 완전히 일치하지 않을 수 있습니다.' }],
    diagnostic: [
      'specified dentofacial anomaly가 있고 K07 다른 subgroup과 맞지 않을 때 사용합니다.',
      '막연한 문제만 있으면 K07.9가 더 안전합니다.',
    ],
    treatment: orthodonticSurgicalEvaluation,
    references: otherDentofacialReferences,
  },
  {
    code: 'K07.9',
    name_en: 'Dentofacial anomaly, unspecified',
    definition:
      '치아얼굴이상이 있다는 정보는 있지만 정확히 턱 크기인지, bite pattern인지, 기능 문제인지 세부 분류가 없는 broad fallback 상태입니다.',
    summary:
      'K07.9는 dentofacial anomaly가 있다고만 적혀 있고 구체 subtype이 없는 경우의 가장 넓은 fallback 코드입니다.',
    anatomy: ['안면 골격 또는 교합'],
    symptoms: [{ name: '치아와 얼굴 비율 또는 bite 이상이 vague하게 기록될 수 있습니다.' }],
    diagnostic: [
      'dentofacial anomaly NOS, unspecified malocclusion family note가 있을 때 사용합니다.',
      '후속 기록에서 구체 subgroup이 확인되면 더 세분화하는 편이 좋습니다.',
    ],
    treatment: orthodonticEvaluation,
    references: unspecifiedDentofacialReferences,
  },
]

export const k07SubcodeEntries: Record<string, EnrichedDiseaseEntry> = Object.fromEntries(
  [
    ...jawSizeEntries,
    ...jawRelationshipEntries,
    ...archRelationshipEntries,
    ...toothPositionEntries,
    ...functionalEntries,
    ...tmdChildEntries,
    ...miscEntries,
  ].map((entry) => [entry.code, createK07Entry(entry)]),
) as Record<string, EnrichedDiseaseEntry>
