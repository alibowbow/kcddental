import type { EnrichedDiseaseEntry } from '../types'

type K00Reference = {
  title: string
  url: string
  type: 'guideline' | 'pubmed' | 'textbook' | 'official' | 'hira'
  year?: number
  note: string
}

const K00_UPDATED_AT = '2026-03-22'

function makeK00Entry(
  params: Omit<EnrichedDiseaseEntry, 'external' | 'provenance'> & {
    references: K00Reference[]
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
      updated_at: K00_UPDATED_AT,
      sources: references.map(({ title, url, year, note }) => ({
        title,
        url,
        year,
        note,
      })),
    },
  }
}

const k00AgenesisReferences: K00Reference[] = [
  {
    title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003061.htm',
    type: 'official',
    year: 2024,
    note: '무치증, 저치증, 지연된 치아 형성과 X-ray 평가 필요성을 K00.0 계열 설명에 반영했습니다.',
  },
  {
    title: 'Teething | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/002045.htm',
    type: 'official',
    year: 2024,
    note: '정상 첫 맹출 시기 범위와 너무 늦을 때 상담이 필요하다는 환자용 조언을 보강했습니다.',
  },
]

const k00SupernumeraryReferences: K00Reference[] = [
  {
    title: 'Hyperdontia (Extra Teeth): Symptoms, Causes & Treatment | Cleveland Clinic',
    url: 'https://my.clevelandclinic.org/health/diseases/hyperdontia',
    type: 'official',
    year: 2023,
    note: '과잉치, 위치별 extra tooth, X-ray 확인과 발치/관찰 가능성을 K00.1 계열에 반영했습니다.',
  },
  {
    title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/001058.htm',
    type: 'official',
    year: 2024,
    note: '과잉치가 crowding과 물림 이상을 만들 수 있다는 환자용 설명을 보강했습니다.',
  },
]

const k00ShapeReferences: K00Reference[] = [
  {
    title: 'Tooth - abnormal shape | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003064.htm',
    type: 'official',
    year: 2024,
    note: '치아의 크기와 형태 이상, 대표 phenotype 예시, X-ray 확인 필요성을 K00.2 계열에 반영했습니다.',
  },
  {
    title: 'Weyers acrofacial dysostosis | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/weyers-acrofacial-dysostosis/',
    type: 'official',
    year: 2012,
    note: 'peg-shaped tooth처럼 크기·형태 이상이 유전 질환과 연결될 수 있음을 보수적으로 보강했습니다.',
  },
  {
    title: 'Dentinogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/dentinogenesis-imperfecta/',
    type: 'official',
    year: 2017,
    note: '순수 형태 이상과 구조 이상이 겹칠 수 있다는 점을 child-code 설명에 보조적으로 사용했습니다.',
  },
]

const k00MottledReferences: K00Reference[] = [
  {
    title: 'About Dental Fluorosis | CDC',
    url: 'https://www.cdc.gov/oral-health/about/about-dental-fluorosis.html',
    type: 'official',
    year: 2024,
    note: '불소 노출과 white flecks, spots, lines 같은 fluorosis 설명을 K00.30 쪽 기준으로 반영했습니다.',
  },
  {
    title: 'Tooth - abnormal colors | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003065.htm',
    type: 'official',
    year: 2024,
    note: '반상치가 불소만이 아니라 다른 발달성 색조 이상에서도 보일 수 있다는 점을 보강했습니다.',
  },
]

const k00FormationReferences: K00Reference[] = [
  {
    title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003061.htm',
    type: 'official',
    year: 2024,
    note: '치아 형성 장애 전반에서 delayed/absent development와 검사 흐름을 K00.4 계열에 반영했습니다.',
  },
  {
    title: 'Tooth - abnormal shape | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003064.htm',
    type: 'official',
    year: 2024,
    note: '형성 장애가 crown/root shape 변화로 이어질 수 있다는 patient-facing 설명을 보강했습니다.',
  },
  {
    title: 'Cleidocranial dysplasia | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/cleidocranial-dysplasia/',
    type: 'official',
    year: 2017,
    note: '발달성 형성 장애가 다른 골격 이상과 연결될 수 있다는 예시를 K00.4 parent에만 보수적으로 사용했습니다.',
  },
]

const k00HereditaryReferences: K00Reference[] = [
  {
    title: 'Amelogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/amelogenesis-imperfecta/',
    type: 'official',
    year: 2025,
    note: '유전성 법랑질 이상, pitting, weakness, discoloration을 K00.50과 K00.5 parent에 반영했습니다.',
  },
  {
    title: 'Dentinogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/dentinogenesis-imperfecta/',
    type: 'official',
    year: 2017,
    note: '유전성 상아질 이상과 translucent, weak teeth 설명을 K00.51 쪽에 반영했습니다.',
  },
  {
    title: 'Osteogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/osteogenesis-imperfecta/',
    type: 'official',
    year: 2020,
    note: '일부 hereditary tooth-structure disorder가 전신 뼈 질환과 연결될 수 있다는 점을 parent 설명에 보강했습니다.',
  },
]

const k00EruptionReferences: K00Reference[] = [
  {
    title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003061.htm',
    type: 'official',
    year: 2024,
    note: '지연 맹출, 무치, 정상 timing variation과 상담 시점을 K00.6 계열에 반영했습니다.',
  },
  {
    title: 'Natal teeth | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003268.htm',
    type: 'official',
    year: 2024,
    note: '선천치/신생치의 aspiration risk와 tongue irritation 가능성을 K00.60, K00.61에 반영했습니다.',
  },
  {
    title: 'Hypodontia Clinic | Specialist Dental Care | UCLH',
    url: 'https://www.uclh.nhs.uk/our-services/find-service/dental-services/hypodontia-clinic',
    type: 'official',
    year: 2026,
    note: '잔존 유치, 숨은 영구치, 교정/수술 계획 필요성을 retained tooth와 eruption planning 설명에 보강했습니다.',
  },
]

const k00TeethingReferences: K00Reference[] = [
  {
    title: 'Teething | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/002045.htm',
    type: 'official',
    year: 2024,
    note: 'teething이 fever/diarrhea의 일반적 설명이 아니라는 환자용 경고를 K00.7에 반영했습니다.',
  },
  {
    title: 'Tips for helping your teething baby | NHS',
    url: 'https://www.nhs.uk/baby/babys-development/teething/tips-for-helping-your-teething-baby/',
    type: 'official',
    year: 2025,
    note: 'teething ring, cool chewing options, age-appropriate analgesics 같은 안전한 대증 관리법을 보강했습니다.',
  },
  {
    title: 'Teething (Teething Syndrome): Symptoms & Tooth Eruption Chart | Cleveland Clinic',
    url: 'https://my.clevelandclinic.org/health/articles/11179-teething-teething-syndrome',
    type: 'official',
    year: 2023,
    note: '정상 eruption chart와 timing variation 설명을 patient summary에 반영했습니다.',
  },
]

const k00OtherDevelopmentReferences: K00Reference[] = [
  {
    title: 'Tooth - abnormal colors | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003065.htm',
    type: 'official',
    year: 2024,
    note: '형성 중 색조 변화가 유전, 약물, 감염, 대사 이상과 연결될 수 있다는 설명을 K00.8 계열에 반영했습니다.',
  },
  {
    title: 'Amelogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/amelogenesis-imperfecta/',
    type: 'official',
    year: 2024,
    note: '발육 중 생긴 색조 변화가 약한 법랑질과 함께 나타날 수 있음을 보강했습니다.',
  },
  {
    title: 'Dentinogenesis imperfecta | MedlinePlus Genetics',
    url: 'https://medlineplus.gov/genetics/condition/dentinogenesis-imperfecta/',
    type: 'official',
    year: 2024,
    note: 'translucent discoloration과 빠른 마모 같은 구조-색조 겹침을 parent 설명에 보강했습니다.',
  },
]

const k00UnspecifiedReferences: K00Reference[] = [
  {
    title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003061.htm',
    type: 'official',
    year: 2024,
    note: '치아 발육 이상이 맹출 지연, 무치 형태로 나타날 수 있다는 broad placeholder 설명에 사용했습니다.',
  },
  {
    title: 'Tooth - abnormal shape | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003064.htm',
    type: 'official',
    year: 2024,
    note: '형태 이상이 subtype을 좁히는 중요한 단서라는 점을 unspecified code 설명에 반영했습니다.',
  },
  {
    title: 'Tooth - abnormal colors | MedlinePlus Medical Encyclopedia',
    url: 'https://medlineplus.gov/ency/article/003065.htm',
    type: 'official',
    year: 2024,
    note: '색조 이상도 발육 문제의 일부가 될 수 있어 K00.9의 broad placeholder 범위를 보강했습니다.',
  },
]

export const k00SubcodeEntries: Record<string, EnrichedDiseaseEntry> = {
  'K00.0': makeK00Entry({
    code: 'K00.0',
    name_en: 'Anodontia',
    synonyms_ko: ['무치증', '선천적 치아 결손'],
    definition:
      'K00.0은 치아가 정상적으로 형성되지 않아 일부 또는 전체 치아가 선천적으로 결손된 상태를 묶는 코드입니다. 저치증, 회치증, 완전 무치증이 여기에 포함됩니다.',
    etiology: ['유전 요인', '발달 과정의 치배 형성 이상', '일부 증후군 또는 내분비 질환과의 연관'],
    risk_factors: ['가족력', '발달성·유전성 질환', '치아 맹출이 지나치게 늦은 영유아'],
    diagnostic_criteria: [
      '치아 맹출 시기와 순서를 확인하고 가족력과 동반 이상을 묻습니다.',
      '치과 X-ray로 실제 치배 유무를 확인해 단순 지연과 결손을 구분합니다.',
    ],
    patient_friendly_summary:
      'K00.0은 치아가 늦게 나는 정도를 넘어, 아예 형성되지 않은 치아가 있는 경우를 묶는 코드입니다. 일부만 없는 경우도 있고 전체가 없는 경우도 있어, 단순히 기다리기보다 X-ray로 확인하는 과정이 중요합니다.',
    references: k00AgenesisReferences,
  }),
  'K00.00': makeK00Entry({
    code: 'K00.00',
    name_en: 'Partial anodontia [hypodontia/oligodontia]',
    definition:
      '부분무치증은 치아 일부가 선천적으로 형성되지 않은 상태를 뜻합니다. 빠진 치아 수가 적으면 저치증, 많으면 회치증으로 설명될 수 있습니다.',
    patient_friendly_summary:
      '영구치 몇 개가 원래부터 만들어지지 않은 경우에 쓰는 세부 코드입니다. 배열 문제와 교정 계획이 함께 논의되는 경우가 많습니다.',
    references: k00AgenesisReferences,
  }),
  'K00.01': makeK00Entry({
    code: 'K00.01',
    name_en: 'Complete anodontia',
    definition:
      '완전무치증은 치아가 전부 선천적으로 형성되지 않은 상태를 뜻합니다. 매우 드문 형태의 치아 발육 이상입니다.',
    patient_friendly_summary:
      '일부가 아니라 치아 전체가 원래부터 만들어지지 않은 경우에 쓰는 세부 코드입니다. 다른 발달성 질환과 함께 평가되는 경우가 많습니다.',
    references: k00AgenesisReferences,
  }),
  'K00.09': makeK00Entry({
    code: 'K00.09',
    name_en: 'Anodontia, unspecified',
    definition:
      '무치증이 기록돼 있지만 부분인지 완전인지 정도가 명확하지 않을 때 쓰는 세부 코드입니다.',
    patient_friendly_summary:
      '차트에 치아 결손은 적혀 있지만 범위가 분명하지 않을 때 사용하는 분류용 코드입니다.',
    references: k00AgenesisReferences,
  }),
  'K00.1': makeK00Entry({
    code: 'K00.1',
    name_en: 'Supernumerary teeth',
    synonyms_ko: ['과잉치', '여분 치아'],
    definition:
      '과잉치는 정상 치아 개수보다 많은 치아가 형성된 상태를 뜻합니다. 맹출을 방해하거나 배열을 흐트러뜨려 crowding과 malocclusion의 원인이 될 수 있습니다.',
    symptoms: [
      {
        name: '여분 치아가 우연히 X-ray에서 발견되거나, 영구치가 늦게 나오는 문제로 확인될 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '주변 치아를 밀거나 정상 맹출을 방해해 crowding이나 물림 이상을 만들 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '구강검진과 치과 X-ray로 extra tooth의 개수와 위치를 확인합니다.',
      '맹출 지연, crowding, 교합 이상이 같이 있는지 평가합니다.',
    ],
    treatment: [
      {
        approach: '관찰 또는 발치',
        description:
          '증상이 없고 영향을 주지 않으면 관찰할 수 있지만, 맹출 방해나 crowding을 만들면 발치와 교정 계획을 고려합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    patient_friendly_summary:
      'K00.1은 정상 개수보다 여분의 치아가 있는 경우를 뜻합니다. 그냥 특이한 모양으로 끝나지 않고, 영구치가 안 나오거나 배열이 틀어지는 원인이 될 수 있습니다.',
    references: k00SupernumeraryReferences,
  }),
  'K00.10': makeK00Entry({
    code: 'K00.10',
    name_en: 'Supernumerary teeth, incisor and canine region',
    definition:
      '절치 또는 견치 부위에 여분의 치아가 생긴 상태를 뜻합니다. mesiodens처럼 앞니 사이에 생기는 과잉치가 대표적입니다.',
    patient_friendly_summary:
      '앞니 또는 송곳니 주변에 extra tooth가 있어 영구치 맹출이나 정중선 배열에 영향을 줄 수 있는 경우에 쓰는 코드입니다.',
    references: k00SupernumeraryReferences,
  }),
  'K00.11': makeK00Entry({
    code: 'K00.11',
    name_en: 'Supernumerary teeth, premolar region',
    definition:
      '소구치 부위에 여분의 치아가 생긴 상태를 뜻합니다.',
    patient_friendly_summary:
      '작은 어금니 구역에 과잉치가 있어 crowding이나 eruption planning에 영향을 줄 때 쓰는 세부 코드입니다.',
    references: k00SupernumeraryReferences,
  }),
  'K00.12': makeK00Entry({
    code: 'K00.12',
    name_en: 'Supernumerary teeth, molar region',
    definition:
      '대구치 부위에 여분의 치아가 생긴 상태를 뜻합니다. paramolar나 distomolar 형태로 발견될 수 있습니다.',
    patient_friendly_summary:
      '어금니 뒤나 옆에 extra tooth가 있는 경우에 쓰는 세부 코드입니다. 사랑니 주변 문제와 구분해서 기록하는 것이 중요합니다.',
    references: k00SupernumeraryReferences,
  }),
  'K00.19': makeK00Entry({
    code: 'K00.19',
    name_en: 'Supernumerary teeth, unspecified',
    definition:
      '과잉치는 분명하지만 정확한 위치가 기록돼 있지 않을 때 쓰는 코드입니다.',
    patient_friendly_summary:
      'extra tooth의 존재는 확인됐지만 절치·소구치·대구치 구역 중 어디인지는 분명하지 않을 때 사용하는 분류용 코드입니다.',
    references: k00SupernumeraryReferences,
  }),
  'K00.2': makeK00Entry({
    code: 'K00.2',
    name_en: 'Abnormalities of size and form of teeth',
    synonyms_ko: ['치아 크기와 형태의 이상'],
    definition:
      'K00.2는 치아가 너무 크거나 작거나, crown과 root 모양이 비정상적인 발육 이상을 묶는 범주입니다. 하나의 질환이라기보다 phenotype bucket에 가깝습니다.',
    anatomy_involved: ['치관 형태', '치근 형태', '치수강과 교합면 morphology'],
    diagnostic_criteria: [
      '실제 치아 수가 아닌 크기와 형태 이상인지 구분합니다.',
      '구강검진과 X-ray로 crown, root, tubercle, invagination 여부를 확인합니다.',
      'syndromic finding이 의심되면 가족력과 다른 craniofacial 이상을 함께 봅니다.',
    ],
    patient_friendly_summary:
      'K00.2는 치아의 크기와 모양이 정상과 다른 여러 발육 이상을 묶는 코드입니다. 같은 K00.2 안에서도 작은 치아, 큰 치아, 이중처럼 보이는 치아, 안으로 말린 치아 등 모습이 꽤 다를 수 있습니다.',
    references: k00ShapeReferences,
  }),
  'K00.20': makeK00Entry({
    code: 'K00.20',
    name_en: 'Macrodontia',
    definition:
      '거대치는 치아가 정상보다 비정상적으로 크게 보이는 발육 이상을 뜻합니다.',
    patient_friendly_summary:
      '치아 하나 또는 여러 개가 또래 치아보다 크게 보여 crowding이나 심미 문제를 만들 때 쓰는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.21': makeK00Entry({
    code: 'K00.21',
    name_en: 'Microdontia',
    definition:
      '왜소치는 치아가 정상보다 작게 형성된 상태를 뜻합니다.',
    patient_friendly_summary:
      '치아가 작거나 peg-shaped로 보여 spacing이나 심미 문제를 만들 때 쓰는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.22': makeK00Entry({
    code: 'K00.22',
    name_en: 'Concrescence',
    definition:
      'Concrescence는 인접한 치아가 주로 뿌리 쪽 시멘트질로 서로 붙어 있는 발육 이상을 뜻합니다.',
    patient_friendly_summary:
      '겉으로는 별일 없어 보여도 발치나 수술 계획에서 중요할 수 있는 치아 유착 형태라, X-ray로 확인될 때 쓰는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.23': makeK00Entry({
    code: 'K00.23',
    name_en: 'Fusion and gemination',
    definition:
      '유합 및 쌍생은 두 치배가 붙거나 하나의 치배가 부분적으로 갈라져 이중처럼 보이는 crown 형태를 만드는 발육 이상입니다.',
    patient_friendly_summary:
      '치아가 두 개가 붙은 것처럼 보이거나 반쯤 나뉜 것처럼 보여 크고 넓게 보일 때 쓰는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.24': makeK00Entry({
    code: 'K00.24',
    name_en: 'Dens evaginatus [occlusal tuberculum]',
    definition:
      'Dens evaginatus는 교합면이나 치관 표면에 추가적인 돌기나 결절이 밖으로 튀어나온 발육 이상을 뜻합니다.',
    patient_friendly_summary:
      '치아 표면에 extra cusp처럼 보이는 돌기가 있어 부딪힘이나 마모, 드물게 치수 문제와 연결될 수 있을 때 쓰는 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.25': makeK00Entry({
    code: 'K00.25',
    name_en: 'Dens invaginatus [dens in dente][dilated odontoma] and incisor anomalies',
    definition:
      'Dens invaginatus는 치아 표면 구조가 안쪽으로 말려 들어간 발육 이상으로, 흔히 tooth within a tooth 형태로 설명됩니다.',
    patient_friendly_summary:
      '겉모양은 비교적 정상이어도 내부 구조가 안으로 접혀 있어 충치나 치수 문제 위험이 커질 수 있는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.26': makeK00Entry({
    code: 'K00.26',
    name_en: 'Premolarization',
    definition:
      'Premolarization은 특정 치아의 형태가 소구치처럼 보이도록 발육한 형태 이상을 뜻합니다.',
    patient_friendly_summary:
      '치아 모양이 원래 기대되는 형태와 달리 소구치처럼 보이는 경우에 사용하는 morphology code입니다.',
    references: k00ShapeReferences,
  }),
  'K00.27': makeK00Entry({
    code: 'K00.27',
    name_en: 'Abnormal tubercles and enamel pearls',
    definition:
      '비정상결절 및 법랑질진주는 치관이나 치근 표면에 추가적인 결절 또는 enamel pearl이 형성된 상태를 뜻합니다.',
    patient_friendly_summary:
      '작은 혹처럼 보이는 돌기나 enamel pearl이 X-ray나 검진에서 확인될 때 쓰는 세부 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.28': makeK00Entry({
    code: 'K00.28',
    name_en: 'Taurodontism',
    definition:
      'Taurodontism은 치수강이 세로로 길고 치근 분지가 아래쪽에 위치하는 bull-like tooth 형태의 발육 이상을 뜻합니다.',
    patient_friendly_summary:
      '겉으로는 잘 안 보여도 root canal anatomy가 평소와 달라 치과 시술 계획에서 중요할 수 있는 형태 이상입니다.',
    references: k00ShapeReferences,
  }),
  'K00.29': makeK00Entry({
    code: 'K00.29',
    name_en: 'Other and unspecified abnormalities of size and form of teeth',
    definition:
      '치아의 크기·형태 이상은 확인됐지만 보다 정확한 phenotype 이름으로 분류하기 어려울 때 쓰는 세부 코드입니다.',
    patient_friendly_summary:
      '치아 모양이나 크기가 비정상적인 건 분명하지만, 거대치·왜소치·dens anomaly처럼 더 구체적인 subtype까지는 정리되지 않았을 때 사용하는 코드입니다.',
    references: k00ShapeReferences,
  }),
  'K00.3': makeK00Entry({
    code: 'K00.3',
    name_en: 'Mottled teeth',
    synonyms_ko: ['반상치', '치아 반점'],
    definition:
      '반상치는 치아 표면에 white flecks, spots, lines 또는 다른 발달성 색조 변화를 보이는 상태를 뜻합니다. dental fluorosis가 가장 익숙한 예지만 원인은 하나로 단정할 수 없습니다.',
    patient_friendly_summary:
      'K00.3은 치아가 반점처럼 얼룩져 보이거나 법랑질 색이 고르지 않은 상태를 묶는 코드입니다. fluorosis가 대표적이지만, 모든 반점 치아가 불소 때문이라고 볼 수는 없습니다.',
    references: k00MottledReferences,
  }),
  'K00.30': makeK00Entry({
    code: 'K00.30',
    name_en: 'Endemic mottled enamel [dental fluorosis]',
    definition:
      '치아 형성 시기에 과도한 fluoride exposure와 연관된 법랑질 반점 및 색조 변화를 뜻합니다.',
    patient_friendly_summary:
      '하얀 점이나 줄무늬처럼 보이는 fluorosis 양상이 분명할 때 쓰는 세부 코드입니다. 대부분은 cosmetic concern이 중심입니다.',
    references: k00MottledReferences,
  }),
  'K00.31': makeK00Entry({
    code: 'K00.31',
    name_en: 'Non-endemic mottled enamel [non-fluoride enamel opacity]',
    definition:
      '불소 외 원인과 연관된 법랑질 반점 또는 opacity를 뜻합니다.',
    patient_friendly_summary:
      '반점 치아가 보이지만 fluoride pattern으로 보기 어렵거나 다른 발달성 enamel opacity가 의심될 때 쓰는 코드입니다.',
    references: k00MottledReferences,
  }),
  'K00.39': makeK00Entry({
    code: 'K00.39',
    name_en: 'Unspecified mottled teeth',
    definition:
      '반상치 또는 발달성 반점이 기록돼 있지만 fluoride 여부나 subtype이 분명하지 않을 때 쓰는 코드입니다.',
    patient_friendly_summary:
      '치아 반점은 확인됐지만 fluorosis인지 다른 opacity인지 명확하지 않을 때 사용하는 분류용 코드입니다.',
    references: k00MottledReferences,
  }),
  'K00.4': makeK00Entry({
    code: 'K00.4',
    name_en: 'Disturbances in tooth formation',
    synonyms_ko: ['치아형성의 장애'],
    definition:
      'K00.4는 법랑질, 시멘트질, crown/root 형태 등 치아가 만들어지는 과정 자체에 생긴 발육 이상을 묶는 범주입니다. 유전성 구조 이상(K00.5)과는 구분해서 보는 편이 안전합니다.',
    anatomy_involved: ['법랑질', '시멘트질', '치관과 치근 형성 과정'],
    diagnostic_criteria: [
      '구강검진과 X-ray로 crown/root formation defect, local developmental defect 여부를 확인합니다.',
      '국소 문제인지 전신적·증후군성 배경이 있는지 함께 살핍니다.',
    ],
    patient_friendly_summary:
      'K00.4는 치아가 만들어지는 과정에서 생긴 발육 이상을 묶는 코드입니다. 법랑질이 얇거나, root가 휘거나, 국소적으로 기형 치아가 생기는 경우처럼 형태가 꽤 다양합니다.',
    references: k00FormationReferences,
  }),
  'K00.40': makeK00Entry({
    code: 'K00.40',
    name_en: 'Enamel hypoplasia',
    definition:
      '법랑질형성저하는 법랑질이 정상보다 얇거나 불완전하게 형성된 상태를 뜻합니다.',
    patient_friendly_summary:
      '치아 표면이 얇고 약하거나 홈·패임이 보여 민감도와 충치 위험이 커질 수 있을 때 쓰는 세부 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.41': makeK00Entry({
    code: 'K00.41',
    name_en: 'Prenatal enamel hypoplasia',
    definition:
      '태내 시기에 영향을 받은 것으로 보는 법랑질형성저하를 뜻합니다.',
    patient_friendly_summary:
      '출생 전 발달 과정과 연결된 enamel defect가 기록돼 있을 때 쓰는 세부 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.42': makeK00Entry({
    code: 'K00.42',
    name_en: 'Neonatal enamel hypoplasia',
    definition:
      '신생아 시기와 연관된 법랑질형성저하를 뜻합니다.',
    patient_friendly_summary:
      '출생 직후 시기의 전신 상태나 neonatal period와 연결된 enamel defect가 기록될 때 쓰는 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.43': makeK00Entry({
    code: 'K00.43',
    name_en: 'Aplasia and hypoplasia of cementum',
    definition:
      '시멘트질이 충분히 형성되지 않았거나 일부 결손된 치아 형성 이상을 뜻합니다.',
    patient_friendly_summary:
      'X-ray나 전문 평가에서 cementum 형성 부족이 분명할 때 쓰는 드문 세부 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.44': makeK00Entry({
    code: 'K00.44',
    name_en: 'Dilaceration',
    definition:
      '만곡치는 치근이나 치관이 비정상적으로 휘어 형성된 상태를 뜻합니다.',
    patient_friendly_summary:
      '치아 뿌리 또는 crown axis가 크게 휘어 발치나 근관치료 계획에서 중요할 수 있는 경우에 쓰는 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.45': makeK00Entry({
    code: 'K00.45',
    name_en: 'Odontodysplasia [regional odontodysplasia]',
    definition:
      '치아형성이상은 치아가 국소적으로 비정상적이고 약하게 형성되는 드문 발육 이상을 뜻합니다. regional odontodysplasia가 대표적입니다.',
    patient_friendly_summary:
      '특정 부위 치아들이 유난히 약하고 형성이 덜 된 것처럼 보이는 경우에 쓰는 드문 세부 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.46': makeK00Entry({
    code: 'K00.46',
    name_en: "Turner's tooth",
    definition:
      '터너치아는 이전 유치의 감염이나 외상 뒤 뒤따르는 영구치에 국소적인 enamel defect가 생긴 상태를 뜻합니다.',
    patient_friendly_summary:
      '주로 한두 개 치아에만 국한된 발달성 enamel defect가 보여 다른 전신성 enamel hypoplasia와 구분될 때 쓰는 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.48': makeK00Entry({
    code: 'K00.48',
    name_en: 'Other specified disturbances in tooth formation',
    definition:
      '치아 형성 장애가 분명하지만 K00.40~K00.46의 이름으로 딱 맞게 분류되지 않을 때 쓰는 세부 코드입니다.',
    patient_friendly_summary:
      '발달성 tooth formation defect가 확인됐지만 더 구체적인 subtype으로 적기 어려운 경우에 사용하는 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.49': makeK00Entry({
    code: 'K00.49',
    name_en: 'Unspecified disturbance in tooth formation',
    definition:
      '치아형성 장애가 기록돼 있지만 구체적인 형태나 원인이 명시되지 않았을 때 쓰는 세부 코드입니다.',
    patient_friendly_summary:
      '치아가 정상적으로 형성되지 않았다는 정보만 있고 subtype이 불분명할 때 사용하는 분류용 코드입니다.',
    references: k00FormationReferences,
  }),
  'K00.5': makeK00Entry({
    code: 'K00.5',
    name_en: 'Hereditary disturbances in tooth structure, not elsewhere classified',
    synonyms_ko: ['달리 분류되지 않은 치아구조의 유전성 장애'],
    definition:
      'K00.5는 법랑질이나 상아질 같은 치아 구조 자체가 유전적으로 약하거나 비정상적인 상태를 묶는 범주입니다. 빠른 마모, 변색, 깨짐이 공통 theme입니다.',
    anatomy_involved: ['법랑질', '상아질', '치아 내부 구조'],
    patient_friendly_summary:
      'K00.5는 치아가 나는 시점보다, 치아 재료 자체가 유전적으로 약하게 형성된 경우를 뜻합니다. 쉽게 닳고 변색되며 부서지기 쉬운 치아가 반복될 때 이 범주를 생각합니다.',
    references: k00HereditaryReferences,
  }),
  'K00.50': makeK00Entry({
    code: 'K00.50',
    name_en: 'Amelogenesis imperfecta',
    definition:
      '불완전 법랑질형성증은 enamel이 제대로 형성되지 않아 얇고 약하고 변색된 치아를 만드는 유전성 질환군입니다.',
    patient_friendly_summary:
      '법랑질이 선천적으로 약해 치아가 패이거나 누렇고 쉽게 닳는 양상이 뚜렷할 때 쓰는 세부 코드입니다.',
    references: k00HereditaryReferences,
  }),
  'K00.51': makeK00Entry({
    code: 'K00.51',
    name_en: 'Dentinogenesis imperfecta',
    definition:
      '불완전 상아질형성증은 dentin이 비정상적으로 형성되어 translucent discoloration, 빠른 마모, 파절을 만들 수 있는 유전성 질환입니다.',
    patient_friendly_summary:
      '치아가 반투명하게 변색되고 쉽게 마모되며 깨지는 유전성 상아질 이상이 분명할 때 쓰는 코드입니다.',
    references: k00HereditaryReferences,
  }),
  'K00.52': makeK00Entry({
    code: 'K00.52',
    name_en: 'Odontogenesis imperfecta',
    definition:
      '불완전 치아형성증은 치아 형성 전반이 유전적으로 비정상적인 상태를 뜻하는 broad hereditary code입니다.',
    patient_friendly_summary:
      '법랑질과 상아질 모두의 유전성 형성 이상이 함께 기록될 때 쓰는 포괄적 세부 코드입니다.',
    references: k00HereditaryReferences,
  }),
  'K00.58': makeK00Entry({
    code: 'K00.58',
    name_en: 'Other specified hereditary disturbances in tooth structure',
    definition:
      '기타 명시된 치아구조의 유전성 장애를 뜻합니다. shell teeth나 dentin dysplasia처럼 별도 이름이 명시될 수 있습니다.',
    patient_friendly_summary:
      '유전성 tooth-structure disorder는 맞지만 K00.50~K00.52의 대표 이름으로 바로 적기 어려운 경우에 쓰는 세부 코드입니다.',
    references: k00HereditaryReferences,
  }),
  'K00.59': makeK00Entry({
    code: 'K00.59',
    name_en: 'Unspecified hereditary disturbance in tooth structure',
    definition:
      '유전성 치아구조 장애가 기록돼 있지만 법랑질인지 상아질인지 subtype이 분명하지 않을 때 쓰는 코드입니다.',
    patient_friendly_summary:
      '가족력과 유전성 치아 약화는 보이지만 보다 구체적인 hereditary tooth diagnosis가 정리되지 않았을 때 사용하는 코드입니다.',
    references: k00HereditaryReferences,
  }),
  'K00.6': makeK00Entry({
    code: 'K00.6',
    name_en: 'Disorders of tooth eruption',
    synonyms_ko: ['치아맹출의 장애'],
    definition:
      'K00.6은 치아가 너무 일찍 나거나 너무 늦게 나거나, 잔존 유치가 남아 있거나, 선천치·신생치처럼 비정상적인 timing과 pattern으로 맹출되는 상태를 묶는 코드입니다.',
    diagnostic_criteria: [
      '정상 맹출 시기와 비교해 timing variation을 확인합니다.',
      'X-ray로 실제 영구치 존재 여부와 맹출 방해 요소를 평가합니다.',
      '선천치·신생치처럼 너무 이른 eruption은 mobility와 aspiration risk를 함께 봅니다.',
    ],
    patient_friendly_summary:
      'K00.6은 치아가 너무 빨리, 너무 늦게, 또는 예상과 다른 방식으로 나오는 문제를 묶는 코드입니다. 단순히 기다리면 되는 경우도 있지만, X-ray나 교정 계획이 필요한 경우도 섞여 있습니다.',
    references: k00EruptionReferences,
  }),
  'K00.60': makeK00Entry({
    code: 'K00.60',
    name_en: 'Natal teeth',
    definition:
      '선천치는 출생 시 이미 입안에 보이는 치아를 뜻합니다.',
    patient_friendly_summary:
      '태어날 때부터 치아가 보여 수유 불편이나 tongue irritation, 드물게 aspiration risk가 논의될 때 쓰는 세부 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.61': makeK00Entry({
    code: 'K00.61',
    name_en: 'Neonatal teeth',
    definition:
      '신생치는 출생 후 첫 30일 이내에 맹출하는 치아를 뜻합니다.',
    patient_friendly_summary:
      '태어난 직후 첫 달 안에 나온 치아로, 선천치와 비슷하게 mobility와 feeding issue를 평가할 때 쓰는 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.62': makeK00Entry({
    code: 'K00.62',
    name_en: 'Premature eruption of teeth',
    definition:
      '치아의 조기맹출은 평균보다 지나치게 이른 시기에 치아가 나오는 상태를 뜻합니다.',
    patient_friendly_summary:
      '정상 timing보다 일찍 치아가 맹출해 feeding, soft tissue irritation, monitoring이 필요할 때 쓰는 세부 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.63': makeK00Entry({
    code: 'K00.63',
    name_en: 'Retained [persistent] primary tooth',
    definition:
      '잔존 유치는 젖니가 예상보다 오래 남아 영구치 교환이 늦어지거나 방해되는 상태를 뜻합니다.',
    patient_friendly_summary:
      '젖니가 빠질 시기가 지났는데 그대로 남아 있어 교환 문제나 hidden adult tooth evaluation이 필요할 때 쓰는 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.64': makeK00Entry({
    code: 'K00.64',
    name_en: 'Late eruption of teeth',
    definition:
      '만기 생치는 정상보다 늦은 시기에 치아가 맹출하는 상태를 뜻합니다.',
    patient_friendly_summary:
      '영구치나 유치가 또래보다 늦게 나와 단순 timing variation인지 발달 이상인지 구분이 필요할 때 쓰는 세부 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.65': makeK00Entry({
    code: 'K00.65',
    name_en: 'Premature shedding of primary teeth',
    definition:
      '유치의 조기탈락은 젖니가 정상보다 이르게 빠지는 상태를 뜻합니다.',
    patient_friendly_summary:
      '젖니가 너무 일찍 빠져 공간 유지나 영구치 eruption planning이 중요해질 때 사용하는 세부 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.68': makeK00Entry({
    code: 'K00.68',
    name_en: 'Other specified disorders of tooth eruption',
    definition:
      '기타 명시된 치아맹출 이상으로, timing이나 pattern 이상은 분명하지만 다른 세부 코드에 딱 맞지 않을 때 씁니다.',
    patient_friendly_summary:
      '맹출 이상이 확인됐지만 선천치·지연맹출·잔존유치 같은 대표 이름으로 바로 적기 어려운 경우에 사용하는 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.69': makeK00Entry({
    code: 'K00.69',
    name_en: 'Unspecified disorder of tooth eruption',
    definition:
      '치아맹출의 장애가 기록돼 있지만 timing 또는 pattern subtype이 분명하지 않을 때 쓰는 코드입니다.',
    patient_friendly_summary:
      '치아가 예상대로 나지 않는다는 정보는 있지만 구체적인 형태가 정리되지 않았을 때 사용하는 placeholder 코드입니다.',
    references: k00EruptionReferences,
  }),
  'K00.7': makeK00Entry({
    code: 'K00.7',
    name_en: 'Teething syndrome',
    synonyms_ko: ['생치증후군', 'teething'],
    definition:
      '생치증후군은 유아에서 치아가 잇몸을 뚫고 나올 때 생기는 가벼운 국소 증상과 불편감을 뜻합니다. 정상 eruption과 함께 나타나는 증상 bucket으로 보는 것이 안전합니다.',
    symptoms: [
      {
        name: '잇몸을 만지려 하거나 보채고, 침이 많아지고, 씹으려는 행동이 늘 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '심한 고열, 지속적 설사, 전신 쇠약은 teething만으로 설명하지 않는 편이 안전합니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    patient_friendly_summary:
      'K00.7은 아기 이가 날 때 생기는 비교적 가벼운 잇몸 불편과 보챔을 설명하는 코드입니다. 다만 고열이나 설사 같은 전신 증상은 teething으로만 돌리지 말고 다른 원인을 확인해야 합니다.',
    references: k00TeethingReferences,
  }),
  'K00.8': makeK00Entry({
    code: 'K00.8',
    name_en: 'Other specified disorders of tooth development',
    synonyms_ko: ['기타 치아발육의 장애'],
    definition:
      'K00.8은 맹출 지연이나 무치증이 아닌, 형성 중 색조 변화처럼 다른 명시된 치아 발육 이상을 묶는 코드입니다. 특히 intrinsic discoloration이 중요한 theme입니다.',
    patient_friendly_summary:
      '치아가 형성될 때의 전신 상태나 약물 노출 때문에 색이 안쪽부터 달라진 경우처럼, 다른 K00 세부 코드로 바로 넣기 어려운 발육 이상에 쓰는 범주입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.80': makeK00Entry({
    code: 'K00.80',
    name_en: 'Discoloration during tooth formation due to blood incompatibility',
    definition:
      '혈액형부적합과 연관된 것으로 기록된 치아 형성 중 내인성 색조변화를 뜻합니다.',
    patient_friendly_summary:
      '신생아기 혈액학적 문제와 연결된 developmental intrinsic staining이 분명할 때 사용하는 드문 세부 코드입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.81': makeK00Entry({
    code: 'K00.81',
    name_en: 'Discoloration during tooth formation due to biliary disease',
    definition:
      '담도계 이상과 연관된 것으로 기록된 치아 형성 중 색조변화를 뜻합니다.',
    patient_friendly_summary:
      '형성기 치아의 intrinsic discoloration이 biliary disease history와 함께 문서화될 때 쓰는 세부 코드입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.82': makeK00Entry({
    code: 'K00.82',
    name_en: 'Discoloration during tooth formation due to porphyria',
    definition:
      '포르피린증과 연관된 치아 형성 중 색조변화를 뜻합니다.',
    patient_friendly_summary:
      '희귀 대사 질환인 porphyria와 developmental tooth discoloration이 함께 기록될 때 사용하는 드문 세부 코드입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.83': makeK00Entry({
    code: 'K00.83',
    name_en: 'Discoloration during tooth formation due to tetracycline',
    definition:
      '치아 형성 시기의 tetracycline exposure와 연관된 내인성 색조변화를 뜻합니다.',
    patient_friendly_summary:
      'tetracycline 복용력 또는 노출력과 연결된 developmental intrinsic staining이 분명할 때 쓰는 세부 코드입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.88': makeK00Entry({
    code: 'K00.88',
    name_en: 'Other specified disorders of tooth development',
    definition:
      '기타 명시된 치아발육의 장애로, 다른 K00 child code 이름에는 딱 맞지 않지만 발달성 문제는 명확할 때 쓰는 세부 코드입니다.',
    patient_friendly_summary:
      '치아 발육 문제는 분명하지만 K00.80~K00.83처럼 원인이 명시되지 않았을 때 쓰는 분류용 코드입니다.',
    references: k00OtherDevelopmentReferences,
  }),
  'K00.9': makeK00Entry({
    code: 'K00.9',
    name_en: 'Unspecified disorder of tooth development',
    definition:
      '치아발육의 장애가 분명하지만 결손, 맹출, 형태, 색조, 구조 이상 중 어느 쪽이 핵심인지 충분히 적혀 있지 않을 때 쓰는 broad placeholder code입니다.',
    patient_friendly_summary:
      '차트에 tooth development problem은 적혀 있지만 더 구체적인 subtype까지는 정리되지 않았을 때 사용하는 코드입니다. 가능하면 더 자세한 K00 child code로 다시 분류하는 편이 좋습니다.',
    references: k00UnspecifiedReferences,
  }),
}
