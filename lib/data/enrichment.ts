import type { EnrichedDiseaseEntry } from '../types'
import { k00SubcodeEntries } from './k00-subcodes'

export const enrichmentData: Record<string, EnrichedDiseaseEntry> = {
  ...k00SubcodeEntries,
  K02: {
    code: 'K02',
    name_en: 'Dental caries',
    synonyms_ko: ['충치', '치아 우식증'],
    definition:
      '치아우식은 입안 세균이 음식물의 탄수화물을 분해해 만든 산으로 치아가 탈회되고 파괴되는 만성적인 구강질환입니다.',
    pathophysiology:
      '치면세균막 안의 세균이 당을 대사하면서 산을 만들고, 이 산이 법랑질과 상아질의 무기질을 반복적으로 녹여 병변을 깊게 만듭니다. 병변이 깊어지면 치수까지 자극이 전달되어 통증과 치수 합병증으로 이어질 수 있습니다.',
    etiology: [
      '치면세균막 안의 세균이 당을 분해하면서 산을 만들고, 그 산이 치아 표면을 약하게 만듭니다.',
      '당분이 자주 공급되고 구강 위생이 충분하지 않으면 탈회가 반복되면서 병변이 깊어집니다.',
    ],
    risk_factors: ['잦은 당분 섭취', '구강 위생 관리 부족', '타액 분비와 완충 기능 저하'],
    anatomy_involved: ['법랑질', '상아질', '진행 시 치수와 치근단 주위 조직'],
    symptoms: [
      {
        name: '차갑거나 뜨거운 자극, 단 음식에 통증이나 시림이 생길 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '진행하면 씹을 때 통증이 심해지거나 치아가 깨지고 잃을 수도 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '증상, 구강 내 임상 검사, 방사선 사진을 함께 보고 진단합니다.',
      '통증의 위치, 시작 시점, 지속 시간, 유발 요인, 기존 치과 치료 이력을 함께 확인합니다.',
      '필요하면 타진, 동요도, 치수, 저작 검사를 추가해 병변 범위와 관련 구조의 상태를 평가합니다.',
    ],
    treatment: [
      {
        approach: '우식 제거와 수복 치료',
        description:
          '우식 부위를 제거한 뒤 치아 상태와 위치에 따라 아말감, 복합레진, 글래스아이오노머 시멘트, 인레이 같은 수복 재료로 형태와 기능을 회복합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '깊은 우식의 치수 보호',
        description:
          '질병관리청 설명 자료에는 우식이 깊은 경우 치아 신경을 보호하는 약제를 도포한 뒤 수복하는 과정을 소개합니다. 병변이 더 깊으면 치수 질환 평가가 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['치수염', '근단 주위 염증 또는 농양', '치아 파절 및 치아 상실'],
    prognosis:
      '초기 우식은 조기에 발견해 관리하면 보존적 치료로 회복 가능성이 높습니다. 치료가 지연되면 치수 질환이나 발치로 이어질 수 있어 정기 검진이 중요합니다.',
    insurance: {
      covered: true,
      coverage_condition:
        '진료일 기준 만 5세 이상 12세 이하 아동의 치수병변이 없는 치아우식증이 있는 영구치(제3대구치 제외)에 광중합형 복합레진 충전을 시행한 경우 건강보험이 적용됩니다.',
      claim_codes: [
        {
          code: '차-13다',
          name: '광중합형 복합레진 충전',
          notes: '동일치아의 치료 종료 시점 면수를 기준으로 1회 산정합니다.',
        },
      ],
      denial_risk_factors: ['신경치료를 시행한 치아', '마모, 침식, 파절 등 치아우식증이 아닌 사유로 시행한 경우'],
      claim_tips: [
        '동일치아 재충전은 적용 기간과 재료에 따라 50% 산정 기준이 달라질 수 있어 최신 HIRA FAQ 확인이 필요합니다.',
      ],
      age_restrictions: '진료일 기준 만 5세 이상 12세 이하',
      frequency_limit: '동일치아 다면 우식은 치료 종료 시점 1회 산정',
      prior_auth_required: false,
      source_title: '광중합형 복합레진 충전의 급여기준이 변경되었다는데 어떻게 되나요? | 건강보험심사평가원',
      source_url: 'https://www.hira.or.kr/bbsDummy.do?brdBltNo=47600&brdScnBltNo=4&pgmid=HIRAA010006011000',
      effective_date: '2020-05-01',
    },
    prevention: [
      '불소 치약을 사용해 규칙적으로 칫솔질합니다.',
      '치실이나 보조 구강위생용품으로 치아 사이 음식물과 치태를 제거합니다.',
      '당분이 오래 남지 않도록 간식과 음료 섭취 습관을 조절합니다.',
      '정기적인 치과 검진과 필요한 예방 관리를 받습니다.',
    ],
    external: {
      pubmed_query: 'dental caries K02',
      youtube_query: '충치 치아우식증',
      references: [
        {
          title: '충치 | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6288',
          type: 'official',
          year: 2024,
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          type: 'official',
          year: 2024,
        },
      ],
    },
    epidemiology: {
      trend:
        '질병관리청 설명 자료는 충치를 매우 흔한 구강질환으로 다루며, 예방을 위해 식이 조절과 불소 사용, 정기 검진의 중요성을 강조합니다.',
      source: '질병관리청 국가건강정보포털 충치 페이지(2024)와 구강병 예방 및 관리방법 페이지(2024)',
    },
    patient_friendly_summary:
      '충치는 치아 표면에 붙은 세균이 당을 분해하며 만든 산 때문에 생깁니다. 초기에 관리하면 더 깊은 통증과 치아 손실을 줄일 수 있어, 집에서의 위생관리와 정기 검진이 중요합니다.',
    provenance: {
      status: 'verified',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '충치 | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6288',
          year: 2024,
          note: '정의, 병태생리, 진단, 합병증 및 예방 설명을 보수적으로 요약했습니다.',
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          year: 2024,
          note: '구강병 예방 수칙을 예방 항목에 반영했습니다.',
        },
      ],
    },
  },
  K04: {
    code: 'K04',
    name_en: 'Diseases of pulp and periapical tissues',
    synonyms_ko: ['치수 질환', '치근단 주위 조직 질환'],
    definition:
      'K04는 치아 내부의 치수와 치근 끝 주변 조직에서 발생하는 염증, 괴사, 농양 등 여러 상태를 묶는 범주입니다. 깊은 우식이나 외상, 기존 치료 후 재감염이 흔한 출발점입니다.',
    pathophysiology:
      '깊은 충치나 손상으로 치수에 염증이 생기면, 좁은 치수강 안에서 압력이 올라가 혈류장애와 통증이 발생할 수 있습니다. 염증이 진행해 치수가 괴사하면 감염이 치근단 주위 조직으로 퍼져 농양이나 낭성 병변으로 이어질 수 있습니다.',
    etiology: [
      '깊은 치아우식으로 인한 세균 감염',
      '치아 외상이나 균열',
      '기존 신경치료 후의 잔존 감염 또는 치근 파절',
    ],
    risk_factors: ['치료되지 않은 깊은 충치', '치아 외상', '치료 지연', '기존 근관치료 치아의 구조적 약화'],
    anatomy_involved: ['치수강과 근관 내부 치수', '치근단 주위 조직', '진행 시 주변 치조골'],
    symptoms: [
      {
        name: '차갑거나 뜨거운 자극 뒤에도 통증이 오래 남거나, 이유 없이 욱신거리는 치통이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
      {
        name: '근단 부위 염증이 심해지면 씹기 어려울 정도의 압통, 잇몸 부종, 두통이나 발열이 동반될 수 있습니다.',
        severity: 'severe',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '통증 양상과 자극 후 지속 시간을 확인하고, 타진과 치수 생활력 검사를 함께 시행합니다.',
      '방사선 촬영으로 치근단 부위 염증, 농양, 낭성 변화 여부를 평가합니다.',
      '기존 충치, 균열, 외상력, 과거 근관치료 여부를 함께 확인합니다.',
    ],
    treatment: [
      {
        approach: '가역성 치수염 단계의 원인 제거',
        description:
          '치수 보존이 가능한 단계에서는 충치를 제거하고 치아를 수복해 염증과 통증의 원인을 줄입니다. 경우에 따라 일시적 충전재를 사용한 뒤 영구 수복으로 교체할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '비가역성 치수염 또는 괴사의 근관치료',
        description:
          '치수 손상이 광범위하면 통증을 조절하고 감염을 제거하기 위해 근관치료가 필요할 수 있습니다. 치수와 근관 내 염증 조직을 제거하고 근관을 정리한 뒤 충전합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '심한 근단 병변의 발치 또는 외과적 처치',
        description:
          '근관치료에도 증상이 지속되거나 치아 손상이 심하면 발치나 치근단 절제술 같은 추가 처치가 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['근단 주위 농양', '누공 형성', '낭성 병변', '발치가 필요한 수준의 치아 손상'],
    prognosis:
      '가역성 단계에서 원인을 조기에 제거하면 치수를 보존할 수 있지만, 비가역적 염증이나 괴사 단계로 진행하면 근관치료나 발치가 필요할 수 있습니다.',
    prevention: [
      '충치를 초기에 치료하고 통증을 방치하지 않습니다.',
      '외상 후 시린 증상이나 씹을 때 통증이 지속되면 빠르게 진료를 받습니다.',
      '근관치료 중이거나 끝난 치아는 정해진 추적 진료를 지킵니다.',
    ],
    epidemiology: {
      peak_age: '근관치료 평가 대상에서는 50세 이상 비중이 높았습니다.',
      trend:
        '2023년 건강보험심사평가원 근관치료 2차 평가에서 근관치료 시작일 주상병 중 치수염(K040)이 50.5%로 가장 많았고, 동이 없는 근단주위농양(K047)이 7.8%였습니다.',
      source: '건강보험심사평가원 2023년 근관치료 2차 평가 결과 공개자료',
    },
    patient_friendly_summary:
      '이 범주는 치아 신경과 뿌리 끝 주변에 생기는 문제를 함께 다룹니다. 충치를 오래 두거나 치아가 손상되면 신경 통증이 생기고, 더 진행하면 뿌리 끝에 염증이 퍼질 수 있어 빠른 진료가 중요합니다.',
    external: {
      pubmed_query: 'pulpitis periapical disease K04',
      youtube_query: '치수염 근단주위 농양',
      references: [
        {
          title: '치수염 - 구강 및 치아 장애 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%B9%98%EC%88%98%EC%97%BC',
          type: 'textbook',
          year: 2024,
        },
        {
          title: '근단 주위 농양(Periapical abscess with sinus) | 질환백과 | 서울아산병원',
          url: 'https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31550',
          type: 'official',
          year: 2026,
        },
        {
          title: '2023년(2차) 근관치료 적정성 평가 결과 공개자료 | 건강보험심사평가원',
          url: 'https://www.hira.or.kr/cms/open/04/04/12/2023_12.pdf',
          type: 'hira',
          year: 2023,
        },
      ],
    },
    provenance: {
      status: 'verified',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '치수염 - 구강 및 치아 장애 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%B9%98%EC%88%98%EC%97%BC',
          year: 2024,
          note: '치수염의 정의, 증상, 진단, 치료 방향을 K04 범주의 상위 설명으로 보수적으로 요약했습니다.',
        },
        {
          title: '근단 주위 농양(Periapical abscess with sinus) | 질환백과 | 서울아산병원',
          url: 'https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31550',
          year: 2026,
          note: '근단 주위 농양의 원인, 증상, 방사선 진단, 치료 및 주의사항을 합병증 설명에 반영했습니다.',
        },
        {
          title: '2023년(2차) 근관치료 적정성 평가 결과 공개자료 | 건강보험심사평가원',
          url: 'https://www.hira.or.kr/cms/open/04/04/12/2023_12.pdf',
          year: 2023,
          note: '근관치료 시작일 기준 주상병 분포를 역학/통계 항목에 반영했으며, 일반 인구 유병률이 아닌 평가 대상 청구자료라는 점을 전제로 사용했습니다.',
        },
      ],
    },
  },
  K05: {
    code: 'K05',
    name_en: 'Gingivitis and periodontal diseases',
    synonyms_ko: ['잇몸병', '치주질환'],
    definition:
      '치은염 및 치주질환은 치아를 둘러싼 잇몸과 치주조직에 생기는 염증성 질환으로, 초기에는 잇몸에 국한되지만 진행하면 잇몸뼈와 치주인대까지 손상될 수 있습니다.',
    pathophysiology:
      '치아 표면의 치태가 시간이 지나며 치석으로 굳고, 그 표면에 세균이 더 쉽게 부착해 잇몸 염증을 일으킵니다. 질환이 진행하면 치아와 치주조직 사이의 부착 소실이 생기고 치조골 높이와 밀도가 변해 치아 지지력이 떨어집니다.',
    risk_factors: [
      '치태와 치석 축적',
      '칫솔질 부족과 치아 사이 위생 관리 부족',
      '흡연, 스트레스, 당뇨병 같은 전신적 위험요인',
      '호르몬 변화나 일부 약물 복용',
    ],
    anatomy_involved: ['치은', '치주인대', '백악질', '치조골'],
    symptoms: [
      {
        name: '칫솔질할 때 잇몸에서 피가 나거나 붓고 붉게 보일 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '구취, 저작 불편, 치아 사이 이물 끼임, 잇몸 퇴축과 치아 흔들림이 나타날 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '위험 요인과 전신질환 여부를 함께 확인합니다.',
      '파노라마나 치근단 방사선 사진으로 치조골 소실과 치아 상태를 평가합니다.',
      '치주낭 깊이, 부착 소실, 치아 동요도, 분지부 병변 등을 치주검사로 확인합니다.',
    ],
    treatment: [
      {
        approach: '치석 제거와 구강위생 관리',
        description:
          '초기 잇몸 염증은 치석제거술과 올바른 칫솔질, 치실·치간칫솔 사용 같은 구강위생 관리로 회복 가능성이 높습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '치근활택술과 비외과적 치주치료',
        description:
          '치주염으로 진행하면 치은 아래 치석과 치태를 줄이기 위해 치근활택술 같은 비외과적 치주치료가 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '중증 진행 시 치주수술과 유지관리',
        description:
          '깊은 치주낭이나 광범위한 조직 파괴가 있으면 치은절제술, 치주판막수술, 골이식술, 조직 유도 재생술 같은 외과적 치료와 3~6개월 간격의 유지관리가 고려됩니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['치은 퇴축', '치조골 소실', '치아 동요와 치아 상실'],
    prognosis:
      '치은염 단계에서는 회복 가능성이 높지만, 치주염으로 진행해 잇몸뼈가 손상되면 원래 상태로 완전히 되돌리기 어렵습니다.',
    insurance: {
      covered: true,
      coverage_condition:
        '만 19세 이상에서 후속 치주질환 처치 없이 전악 치석제거만으로 치료가 종료되는 경우 건강보험이 연 1회 적용됩니다.',
      claim_codes: [
        {
          code: 'U2233',
          name: '치석제거 나. 전악',
          notes: '후속 치주질환 처치 없이 전악 치석제거만으로 종료되는 경우입니다.',
        },
      ],
      denial_risk_factors: ['구취 제거 목적', '치아 착색물질 제거 목적', '치아 교정 및 보철을 위한 예방 목적 시행', '연 1회 초과 시행'],
      claim_tips: ['시술일 사전 등록 여부와 연간 수진 이력을 먼저 확인하는 편이 안전합니다.'],
      age_restrictions: '전악 치석제거는 만 19세 이상',
      frequency_limit: '연 1회(매년 1월 1일~12월 31일)',
      prior_auth_required: false,
      source_title: '치석제거 급여안내 | 국민건강보험공단',
      source_url: 'https://www.nhis.or.kr/static/html/wbma/c/wbmac0218.html',
      effective_date: '2018-01-01',
    },
    prevention: [
      '잇몸에서 치아 방향으로 쓸어 올리는 올바른 칫솔질을 합니다.',
      '칫솔질 후 치실이나 치간칫솔로 치아 사이 치태를 제거합니다.',
      '잇몸이 내려가 치아 사이 공간이 넓다면 치간칫솔 같은 보조기구를 함께 사용합니다.',
      '정기적인 치과 검진과 필요한 유지 관리를 받습니다.',
    ],
    epidemiology: {
      prevalence_korea:
        '국민건강영양조사 제7기 3차년도(2018) 구강검사 기준, 우리나라 19세 이상 성인의 치주질환 유병률은 23.4%입니다.',
      peak_age: '연령이 증가할수록 유병률이 높아지고 특히 50세 이상에서 급격히 증가합니다.',
      trend: '남녀 모두 연령이 높아질수록 유병률이 상승하는 패턴이 보고됩니다.',
      source: '질병관리청 국가건강정보포털 잇몸병(치주질환) 페이지(2025)',
    },
    patient_friendly_summary:
      '잇몸병은 초기에 피가 나고 붓는 정도로 시작할 수 있지만, 관리하지 않으면 잇몸뼈가 줄고 치아가 흔들릴 수 있습니다. 매일의 구강위생 관리와 정기 검진이 가장 중요한 예방법입니다.',
    external: {
      pubmed_query: 'periodontal disease K05',
      youtube_query: '잇몸병 치주질환',
      references: [
        {
          title: '잇몸병(치주질환) | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5716',
          type: 'official',
          year: 2025,
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'verified',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '잇몸병(치주질환) | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5716',
          year: 2025,
          note: '정의, 병태생리, 역학, 진단과 치료 원칙, 자가 관리 내용을 보수적으로 요약했습니다.',
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          year: 2024,
          note: '치주질환 예방 설명을 예방 항목에 반영했습니다.',
        },
      ],
    },
  },
  K12: {
    code: 'K12',
    name_en: 'Stomatitis and related lesions',
    synonyms_ko: ['구내염', '구강 점막 염증'],
    definition:
      '구내염은 입술, 혀, 잇몸, 입천장, 볼점막 등 구강점막에 생기는 염증 질환의 통칭입니다. 감염성 원인과 비감염성 원인이 모두 가능하며, 대개 통증을 동반합니다.',
    pathophysiology:
      '감염, 자가면역 반응, 외상, 방사선 조사, 영양 결핍 등 다양한 자극이 구강점막의 염증 반응을 유발합니다. 원인에 따라 수포, 궤양, 위막, 작열감처럼 보이는 양상이 달라질 수 있습니다.',
    etiology: [
      '감염성 원인: 단순포진, 수족구병, 구강 칸디다증 등',
      '비감염성 원인: 아프타 구내염, 구강 작열감 증후군, 방사선 점막염 등',
      '외상, 영양 결핍, 자가 면역 반응, 고령과 구강건조 등의 전신적 요인',
    ],
    risk_factors: ['면역 저하', '구강 위생 저하', '영양 결핍', '자극적인 음식', '흡연과 음주', '방사선 치료 또는 구강건조'],
    anatomy_involved: ['입술', '혀', '잇몸', '입천장', '볼점막 등 구강 점막'],
    symptoms: [
      {
        name: '구강 점막의 통증, 화끈거림, 작고 얕은 궤양이나 수포가 흔합니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '감염성 형태에서는 발열, 식욕 저하, 림프절 비대, 섭취 곤란이 동반될 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '병변의 모양과 위치를 육안으로 확인하고, 발생 시기와 반복 여부를 묻습니다.',
      '병변이 2~3주 이상 지속되거나 치료에 반응하지 않으면 조직검사를 포함한 추가 평가가 필요합니다.',
      '반복되거나 전신질환이 의심되면 빈혈, 면역저하, 혈액질환 등을 감별하기 위한 검사를 고려합니다.',
    ],
    treatment: [
      {
        approach: '원인 교정과 대증 치료',
        description:
          '구내염은 감염, 자가 면역, 방사선 조사 등 원인에 대한 치료와 함께 통증을 줄이기 위한 대증 치료를 병행합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '감염성 구내염의 보존적·약물 치료',
        description:
          '단순포진 구내염은 구강 위생 관리, 수분 섭취, 구강 함수와 함께 항바이러스제를 사용할 수 있고, 구강 칸디다증은 항진균제가 도움이 될 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '비감염성 구내염의 점막 보호와 반복 병변 평가',
        description:
          '아프타 구내염 등은 점막 보호제, 국소 치료, 통증 조절을 중심으로 관리하며, 병변이 오래 지속되거나 반복되면 전문 진찰과 추가 검사가 필요합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['식사와 수분 섭취 불편', '소아의 탈수 가능성', '반복성 병변에 따른 삶의 질 저하', '지속 병변의 경우 악성 질환 감별 지연 위험'],
    prognosis:
      '대부분은 적절한 치료와 자가 관리에 잘 반응합니다. 다만 병변이 오래 지속되거나 반복되면 다른 질환과 감별하기 위한 전문 진찰이 필요합니다.',
    prevention: [
      '충분한 영양 섭취와 구강 위생 관리를 유지합니다.',
      '금연과 절주를 실천하고 자극적인 음식은 피합니다.',
      '반복되거나 오래가는 병변은 자가 판단으로 넘기지 말고 진료를 받습니다.',
    ],
    epidemiology: {
      prevalence_korea: '보건의료빅데이터 자료(2023)에 따르면 연간 약 1,300명의 환자가 보고되었습니다.',
      peak_age: '주로 20~30대와 10세 이하 소아에서 많이 발생하며, 50세 이상에서도 증가 추세가 있습니다.',
      trend: '50세 이상에서는 특히 여성에서 더 많이 발생하는 경향이 보고되었습니다.',
      source: '질병관리청 국가건강정보포털 구내염 페이지(2025)',
    },
    patient_friendly_summary:
      '구내염은 입안 점막이 헐거나 화끈거리고 아픈 상태를 넓게 가리킵니다. 대부분 좋아지지만, 오래가거나 반복되면 다른 질환과 구분이 필요하므로 진료를 받는 것이 안전합니다.',
    external: {
      pubmed_query: 'stomatitis oral mucositis K12',
      youtube_query: '구내염 입안 헐었을 때',
      references: [
        {
          title: '구내염 | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5485',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'verified',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '구내염 | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5485',
          year: 2025,
          note: '정의, 원인 분류, 진단 기준, 치료 원칙, 위험요인 및 예방, 2023 보건의료빅데이터 통계를 보수적으로 요약했습니다.',
        },
      ],
    },
  },
  K01: {
    code: 'K01',
    name_en: 'Embedded and impacted teeth',
    synonyms_ko: ['매복치', '매몰치'],
    definition:
      'K01은 치아가 정상적으로 맹출하지 못하고 잇몸이나 뼈 속에 남아 있는 상태를 묶는 범주입니다. 사랑니처럼 턱 안 공간이 부족한 치아에서 흔히 보입니다.',
    pathophysiology:
      '치아가 올라올 공간이 부족하거나 맹출 방향이 비정상이면 치아가 잇몸과 뼈 속에 남게 됩니다. 이 상태가 지속되면 인접 치아와 잇몸에 압박, 염증, 통증을 일으킬 수 있습니다.',
    etiology: ['턱 크기에 비해 치아가 클 때', '사랑니를 포함한 마지막 치아의 맹출 공간 부족', '비정상적인 맹출 방향 또는 인접 치아에 의한 차단'],
    risk_factors: ['치열 공간 부족', '사랑니 보유', '비정상 맹출 경로', '주변 치아의 혼잡'],
    anatomy_involved: ['매복된 치아 자체', '주변 잇몸', '주변 치조골', '인접 치아 뿌리'],
    symptoms: [
      {
        name: '증상이 없을 수도 있지만, 부분 맹출된 경우 잇몸 통증과 음식물 끼임이 생길 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '염증이 생기면 붓기, 입 벌리기 불편, 반복 감염 또는 인접 치아 통증이 나타날 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '구강 검진에서 치아가 나오지 않았거나 부분 맹출된 상태를 확인합니다.',
      '치과 방사선 사진으로 치아 위치와 인접 치아·뼈와의 관계를 평가합니다.',
      '반복 염증, 낭성 변화, 인접 치아 손상 여부를 함께 점검합니다.',
    ],
    prevention: [
      '청소년기와 성인 초기에 정기 검진과 방사선 평가로 매복 가능성을 확인합니다.',
      '부분 맹출된 사랑니 부위는 음식물이 끼지 않도록 위생 관리를 철저히 합니다.',
      '반복 부종이나 통증이 있으면 지연하지 말고 진료를 받습니다.',
    ],
    patient_friendly_summary:
      '매복치는 치아가 제대로 나오지 못한 상태를 말합니다. 별일 없이 지내는 경우도 있지만, 붓기나 통증이 반복되면 주변 치아까지 영향을 줄 수 있어 확인하는 편이 좋습니다.',
    external: {
      pubmed_query: 'impacted teeth K01',
      youtube_query: '매복치 사랑니 매복',
      references: [
        {
          title: 'Impacted Teeth - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/en-au/home/mouth-and-dental-disorders/tooth-disorders/impacted-teeth',
          type: 'textbook',
          year: 2024,
        },
        {
          title: 'Impacted tooth - MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001057.htm',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Impacted Teeth - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/en-au/home/mouth-and-dental-disorders/tooth-disorders/impacted-teeth',
          year: 2024,
          note: '매복치의 정의, 원인, 영상 확인, 반복 감염과 제거 필요성을 상위 코드 설명으로 보수적으로 요약했습니다.',
        },
        {
          title: 'Impacted tooth - MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001057.htm',
          year: 2024,
          note: '매복치의 증상과 환자 설명 문구를 보조 출처로 참고했습니다.',
        },
      ],
    },
  },
  K03: {
    code: 'K03',
    name_en: 'Other diseases of hard tissues of teeth',
    synonyms_ko: ['치아 경조직 질환', '치아 마모·침식'],
    definition:
      'K03은 법랑질과 상아질 같은 치아 경조직이 마모, 침식, 파절 또는 구조 약화로 손상되는 상태를 묶는 범주입니다. 환자 입장에서는 대개 치아 표면이 닳거나 시린 문제로 느껴집니다.',
    pathophysiology:
      '산성 환경이나 반복적인 기계적 마찰이 치아 표면을 조금씩 제거하면 법랑질이 얇아지고 상아질이 노출될 수 있습니다. 이렇게 되면 치아가 더 민감해지고 형태 변화가 눈에 띄기 쉬워집니다.',
    risk_factors: ['산성 음료와 역류성 질환', '이갈이와 이악물기', '강한 칫솔질과 마모성 치약', '유전성 경조직 약화 질환'],
    anatomy_involved: ['법랑질', '상아질', '노출된 치근 표면'],
    symptoms: [
      {
        name: '치아가 얇아 보이거나 반짝이고, 차갑거나 단 음식에 시릴 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '마모가 심해지면 치아 길이가 짧아지거나 깨지고, 씹을 때 불편함이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '치아 표면의 닳음, 광택, 균열, 민감도 변화를 임상적으로 확인합니다.',
      '식습관, 산 노출, 위산 역류, 이갈이 습관 같은 배경 요인을 함께 평가합니다.',
      '필요하면 반복 사진이나 모형 비교로 진행 여부를 확인합니다.',
    ],
    prevention: [
      '산성 음료와 간식 노출을 줄이고, 섭취 후 바로 강하게 칫솔질하지 않습니다.',
      '이갈이 습관이 있으면 보호장치나 교합 평가를 고려합니다.',
      '시린 증상과 닳음이 보이면 초기에 진료를 받아 진행을 줄입니다.',
    ],
    patient_friendly_summary:
      '치아가 닳는 문제는 한 번 생기면 되돌리기 어렵기 때문에, 시린 증상이나 표면 변화가 보일 때 빨리 알아차리는 것이 중요합니다. 산성 음료, 이갈이, 강한 칫솔질 습관이 함께 작용하는 경우가 많습니다.',
    external: {
      pubmed_query: 'tooth wear hard tissue defects K03',
      youtube_query: '치아 마모 침식 시린이',
      references: [
        {
          title: 'Tooth wear - What is it?',
          url: 'https://www.royaldevon.nhs.uk/media/w0rps5lp/tooth-wear-leaflet-ap.pdf',
          type: 'official',
          year: 2019,
        },
        {
          title: 'Amelogenesis imperfecta - MedlinePlus Genetics',
          url: 'https://medlineplus.gov/genetics/condition/amelogenesis-imperfecta/',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Dentinogenesis imperfecta - MedlinePlus Genetics',
          url: 'https://medlineplus.gov/genetics/condition/dentinogenesis-imperfecta/',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Tooth wear - What is it?',
          url: 'https://www.royaldevon.nhs.uk/media/w0rps5lp/tooth-wear-leaflet-ap.pdf',
          year: 2019,
          note: '치아 마모의 정의, 주요 패턴, 증상, 생활습관 위험요인을 K03 상위 설명으로 요약했습니다.',
        },
        {
          title: 'Amelogenesis imperfecta - MedlinePlus Genetics',
          url: 'https://medlineplus.gov/genetics/condition/amelogenesis-imperfecta/',
          year: 2024,
          note: '유전성 법랑질 약화를 K03의 희귀 배경 원인 예시로만 제한해 참고했습니다.',
        },
      ],
    },
  },
  K08: {
    code: 'K08',
    name_en: 'Other disorders of teeth and supporting structures',
    synonyms_ko: ['치아 및 지지구조 장애', '치아 상실과 지지조직 문제'],
    definition:
      'K08은 치아 상실, 잔존치근, 치아 동요처럼 치아 자체와 이를 지지하는 구조에 생기는 문제를 묶는 범주입니다. 환자에게는 치아가 흔들리거나 빠지고 씹기 불편한 문제로 느껴질 수 있습니다.',
    pathophysiology:
      '치아를 지지하는 인대와 뼈가 염증이나 손상으로 약해지면 치아가 제자리를 유지하기 어려워집니다. 지지력이 떨어지면 치아가 이동하거나 빠지고, 씹는 기능도 함께 떨어질 수 있습니다.',
    risk_factors: ['치주질환의 방치', '흡연', '당뇨병', '구강위생 부족', '반복적인 교합 외상'],
    anatomy_involved: ['치아 뿌리', '치주인대', '치조골', '주변 잇몸'],
    symptoms: [
      {
        name: '치아가 흔들리거나 사이가 벌어지고, 잇몸이 내려가 보일 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '씹기 어렵거나 치아가 빠진 뒤 말하기·저작 기능이 떨어질 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '치아 동요도와 잔존치근, 결손 치아 여부를 임상적으로 확인합니다.',
      '치조골 소실과 지지조직 상태를 방사선 사진과 치주검사로 평가합니다.',
      '기존 치주질환, 흡연, 당뇨병 같은 악화 요인을 함께 확인합니다.',
    ],
    complications: ['치아 상실', '저작 기능 저하', '인접 치아 이동', '추가적인 보철·유지관리 필요'],
    prevention: [
      '정기적인 치주 관리와 스케일링으로 지지조직 손상을 줄입니다.',
      '흡연을 줄이고 당뇨병 같은 전신질환을 잘 조절합니다.',
      '치아가 흔들리거나 빠졌다면 지연하지 말고 기능 회복 상담을 받습니다.',
    ],
    patient_friendly_summary:
      '치아가 흔들리거나 빠지는 문제는 단순히 치아 하나의 문제가 아니라, 이를 지지하는 잇몸과 뼈가 약해졌다는 신호일 수 있습니다. 초기에 관리할수록 기능 저하를 줄이기 쉽습니다.',
    external: {
      pubmed_query: 'tooth loss supporting structures K08',
      youtube_query: '치아 동요 치아 상실 잇몸뼈',
      references: [
        {
          title: 'Periodontitis - MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001059.htm',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Dental Exam - MedlinePlus Medical Test',
          url: 'https://medlineplus.gov/lab-tests/dental-exam/',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Periodontitis - MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001059.htm',
          year: 2024,
          note: '지지구조 파괴, 치아 동요, 치아 상실과 예방 관리 메시지를 K08 상위 설명으로 제한해 반영했습니다.',
        },
        {
          title: 'Dental Exam - MedlinePlus Medical Test',
          url: 'https://medlineplus.gov/lab-tests/dental-exam/',
          year: 2024,
          note: '정기 검진과 치과 평가의 중요성을 예방 항목에 참고했습니다.',
        },
      ],
    },
  },
  K11: {
    code: 'K11',
    name_en: 'Diseases of salivary glands',
    synonyms_ko: ['침샘 질환', '타액선 질환'],
    definition:
      'K11은 침샘의 기능 저하, 결석, 감염, 농양, 점액류와 같은 침샘 관련 질환을 묶는 범주입니다. 침의 흐름이 줄거나 막히면 통증, 부기, 구강건조와 2차 구강 문제로 이어질 수 있습니다.',
    pathophysiology:
      '침샘 질환의 공통 축은 침 분비 감소 또는 배출 장애입니다. 침은 구강을 보호하고 산을 중화하며 치아의 미네랄 소실을 줄이는데, 침 흐름이 부족하거나 관이 막히면 충치, 말하기·삼키기 불편, 반복 감염이 더 쉽게 생깁니다.',
    etiology: [
      '쇼그렌 증후군, 류마티스관절염, 루푸스 같은 전신 질환',
      'HIV 감염, 세균 감염, 침샘관 결석',
      '항우울제, 항히스타민제, 항정신병제, 이뇨제, 두경부 방사선 치료 등 침 분비를 줄이는 약물·치료',
    ],
    risk_factors: ['탈수', '침 분비를 줄이는 약물 복용', '두경부 방사선 치료', '통풍', '만성 질환과 구강건조'],
    anatomy_involved: ['귀밑샘', '턱밑샘', '혀밑샘', '소타액선과 침샘관'],
    symptoms: [
      {
        name: '입이 마르고 말하거나 삼키기 불편하며 충치가 빠르게 생길 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '결석이나 감염이 있으면 식사 후 침샘 부위가 아프게 붓고, 열·오한·고름이 동반될 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '약물 복용력, 전신질환, 방사선 치료력과 식사 시 악화되는 부기 여부를 확인합니다.',
      '구강 건조 정도와 침 흐름을 확인하고, 필요하면 CT·초음파·내시경·배양 검사를 시행합니다.',
      '원인 불명 부종이나 종양이 의심되면 생검이나 영상 검사를 통해 감별합니다.',
    ],
    treatment: [
      {
        approach: '구강건조의 보존적 관리',
        description:
          '침 분비를 줄이는 약물을 조정하고, 수분을 조금씩 자주 섭취하며, 불소 사용과 철저한 구강위생 관리, 무설탕 껌이나 자일리톨 캔디, 타액 대체제를 활용합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '침샘 결석의 배출 촉진과 제거',
        description:
          '진통제, 수분 섭취, 마사지, 온찜질, 레몬주스·신 사탕 같은 침 분비 자극으로 결석 배출을 시도하고, 실패하면 기구적 제거·내시경·수술을 고려합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '침샘 감염의 항생제 치료',
        description:
          '세균 감염이 의심되면 항생제와 온찜질, 배농, 구강위생 개선을 함께 시행합니다. 농양이 있으면 절개 배농이 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['치근 우식과 충치 증가', '말하기·씹기·삼키기 어려움', '반복 감염과 농양', '지속적인 침샘 부종'],
    prognosis:
      '약물성·일시적 원인에서는 호전될 수 있지만, 방사선 손상이나 만성 전신질환과 연결된 경우에는 증상이 오래 지속될 수 있습니다.',
    prevention: [
      '물을 충분히 마시고, 입마름을 악화시키는 약물은 의료진과 상의해 조정합니다.',
      '불소 사용과 정기 구강검진으로 충치와 치주질환 위험을 낮춥니다.',
      '식사 후 반복되는 침샘 부기나 발열이 있으면 조기에 진료를 받습니다.',
    ],
    epidemiology: {
      trend:
        '선택한 공공 자료는 침샘 기능 저하와 결석이 성인에서 비교적 흔한 임상 문제라고 설명하지만, K11 전체 범주에 대한 단일 유병률 수치는 제시하지 않습니다.',
    },
    patient_friendly_summary:
      '침샘 질환은 입마름부터 침샘 결석, 감염까지 여러 문제를 포함합니다. 식사 후 침샘이 붓거나 입이 오래 마르면 단순 불편으로 넘기지 말고 확인하는 편이 안전합니다.',
    external: {
      pubmed_query: 'salivary gland disorders xerostomia K11',
      youtube_query: '침샘 질환 구강건조 타석증',
      references: [
        {
          title: '침샘 질환 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EC%9D%B4%EB%B9%84%EC%9D%B8%ED%9B%84%EA%B3%BC-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%9D%B8%ED%9B%84-%EC%9E%A5%EC%95%A0/%EC%B9%A8%EC%83%98-%EC%A7%88%ED%99%98',
          type: 'textbook',
          year: 2024,
        },
        {
          title: '구강 건조 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EA%B1%B4%EC%A1%B0',
          type: 'textbook',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '침샘 질환 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EC%9D%B4%EB%B9%84%EC%9D%B8%ED%9B%84%EA%B3%BC-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%9D%B8%ED%9B%84-%EC%9E%A5%EC%95%A0/%EC%B9%A8%EC%83%98-%EC%A7%88%ED%99%98',
          year: 2024,
          note: '침샘 기능 부전, 결석, 감염, 부종의 공통 진단·치료 원칙을 K11 상위 설명으로 보수적으로 요약했습니다.',
        },
        {
          title: '구강 건조 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EA%B1%B4%EC%A1%B0',
          year: 2024,
          note: '구강건조의 원인, 검진 포인트, 합병증, 자가 관리 요소를 위험요인과 예방 항목에 반영했습니다.',
        },
      ],
    },
  },
  K13: {
    code: 'K13',
    name_en: 'Other diseases of lip and oral mucosa',
    synonyms_ko: ['입술 및 구강점막 질환', '구강 점막 병변'],
    definition:
      'K13은 입술과 구강점막에 생기는 각종 병변 가운데 다른 범주로 분류되지 않는 상태를 묶는 코드입니다. 백반, 변색, 반복 자극에 의한 변화, 지속 병변 같은 점막 이상이 포함될 수 있습니다.',
    pathophysiology:
      '입술과 구강점막은 반복 마찰, 흡연, 알레르기, 감염, 영양 결핍, 전신질환의 영향을 쉽게 받습니다. 그 결과 색 변화, 궤양, 두꺼워진 흰 병변, 붉은 병변, 종괴처럼 보이는 변화가 생길 수 있습니다.',
    etiology: [
      '반복 외상, 볼·입술 깨물기, 잘 맞지 않은 의치, 날카로운 치아 자극',
      '칸디다증 같은 감염, 담배와 알코올, 치약·가글·껌 성분에 대한 자극 또는 알레르기',
      '빈혈, 비타민 결핍, 전신질환, 전암성 또는 종양성 병변',
    ],
    risk_factors: ['흡연과 음주', '반복되는 점막 자극', '부적합한 의치와 보철', '영양 결핍', '지속적인 백색·홍색 병변'],
    anatomy_involved: ['입술', '볼점막', '입천장', '구강저', '잇몸과 기타 구강 점막 표면'],
    symptoms: [
      {
        name: '입술이나 구강점막에 흰색·붉은색·갈색 반점, 궤양, 자극감 또는 국소 통증이 생길 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '사라지지 않는 병변, 덩이, 두꺼워진 부위는 전암성 또는 종양성 병변의 평가가 필요합니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '병변의 색, 크기, 표면, 지속 기간과 반복 외상 여부를 함께 확인합니다.',
      '백색·홍색 병변이 닦여 없어지지 않거나 1~2주 이상 지속되면 치과 또는 병원 평가가 필요합니다.',
      '원인 불명 종괴나 지속 병변은 생검을 포함한 추가 검사를 고려합니다.',
    ],
    treatment: [
      {
        approach: '원인 제거와 점막 자극 감소',
        description:
          '날카로운 치아, 잘 맞지 않은 의치, 습관성 깨물기처럼 반복 자극을 줄이고 흡연·음주를 중단하도록 안내합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '감염·염증 원인 치료',
        description:
          '칸디다증 등 원인이 확인되면 원인에 맞는 치료를 하고, 자극성 제품이나 알레르기 유발 물질은 피합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '지속 병변의 조직 평가',
        description:
          '사라지지 않는 흰색·붉은색 병변, 덩이, 종양성 병변 의심 소견은 생검과 전문 진료로 확인하는 것이 안전합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['식사와 말하기 시 점막 통증', '반복 외상과 재발', '전암성 병변 또는 구강암 진단 지연'],
    prognosis:
      '양성 점막 변화는 원인을 제거하면 호전될 수 있지만, 오래 지속되는 백색·홍색 병변이나 덩이는 반드시 평가가 필요합니다.',
    prevention: [
      '흡연과 과음은 줄이거나 중단합니다.',
      '의치와 보철은 잘 맞게 조정하고, 반복적으로 점막을 깨무는 습관을 교정합니다.',
      '입술이나 구강점막의 병변이 1~2주 이상 지속되면 검진을 받습니다.',
    ],
    epidemiology: {
      trend:
        '선택한 공공 자료는 K13 전체 범주의 단일 유병률을 제시하지 않지만, 지속적인 흰색·붉은색 병변과 구강 종양 의심 소견을 임상적으로 중요한 경고 신호로 다룹니다.',
    },
    patient_friendly_summary:
      '입술이나 입안 점막의 이상은 단순 상처일 수도 있지만, 오래 가는 흰색·붉은색 병변은 더 자세한 확인이 필요할 수 있습니다. 특히 잘 낫지 않는 병변은 미루지 말고 보는 편이 좋습니다.',
    external: {
      pubmed_query: 'oral mucosal lesions lip mucosa K13',
      youtube_query: '구강 점막 병변 백반 구강 검사',
      references: [
        {
          title: '입술 궤양, 입술 염증 및 기타 변화 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EA%B6%A4%EC%96%91-%EC%9E%85%EC%88%A0-%EC%97%BC%EC%A6%9D-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EB%B3%80%ED%99%94',
          type: 'textbook',
          year: 2024,
        },
        {
          title: '구강 내 변색 및 반점 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EB%82%B4-%EB%B3%80%EC%83%89-%EB%B0%8F-%EB%B0%98%EC%A0%90',
          type: 'textbook',
          year: 2024,
        },
        {
          title: '구강 종양 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EC%A2%85%EC%96%91',
          type: 'textbook',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '입술 궤양, 입술 염증 및 기타 변화 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EA%B6%A4%EC%96%91-%EC%9E%85%EC%88%A0-%EC%97%BC%EC%A6%9D-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EB%B3%80%ED%99%94',
          year: 2024,
          note: '입술 병변의 원인과 경고 신호를 K13의 입술·점막 범위 설명에 반영했습니다.',
        },
        {
          title: '구강 내 변색 및 반점 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EB%82%B4-%EB%B3%80%EC%83%89-%EB%B0%8F-%EB%B0%98%EC%A0%90',
          year: 2024,
          note: '점막 변색, 백색·홍색 병변, 지속 병변의 평가 필요성을 진단과 위험요인에 반영했습니다.',
        },
        {
          title: '구강 종양 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%A7%88%ED%99%98-%EC%A6%9D%EC%83%81/%EA%B5%AC%EA%B0%95-%EC%A2%85%EC%96%91',
          year: 2025,
          note: '오래 지속되는 점막 병변과 종괴에 대한 생검·전문 평가 기준을 보수적으로 반영했습니다.',
        },
      ],
    },
  },
  K14: {
    code: 'K14',
    name_en: 'Diseases of tongue',
    synonyms_ko: ['혀 질환', '설질환'],
    definition:
      'K14는 설염, 지도모양 혀, 유두의 비대·위축, 설통처럼 혀의 색, 표면, 통증과 관련된 질환을 묶는 범주입니다. 일부는 양성이지만, 전신질환이나 구강건조 같은 배경 상태를 확인해야 할 때가 있습니다.',
    pathophysiology:
      '혀 질환은 유두의 모양 변화, 점막 염증, 감각 이상, 전신질환에 따른 2차 변화로 나타날 수 있습니다. 구강 작열감은 눈에 띄는 병변이 없더라도 신경성 통증 또는 다른 질환의 공통 증상으로 나타날 수 있습니다.',
    etiology: [
      '비타민 B12·엽산 결핍, 빈혈, 당뇨병 같은 전신 상태',
      '칸디다증, 구강건조, 알레르기, 특정 약물과 자극성 식품',
      '흡연, 색소가 있는 음식, 혀 위 박테리아 증식, 습관성 혀 움직임이나 이갈이',
    ],
    risk_factors: ['구강건조', '영양 결핍', '빈혈과 당뇨병', '흡연', '알레르기와 자극 물질', '만성적인 구강 습관'],
    anatomy_involved: ['혀의 배면', '혀유두', '혀의 측면과 복측 점막'],
    symptoms: [
      {
        name: '혀의 색이 변하거나 표면이 매끈해지고, 자극감 또는 미각 변화가 동반될 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '뚜렷한 병변이 없어도 혀가 화끈거리거나 아프고 식습관 변화, 불안, 삶의 질 저하로 이어질 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '혀의 색, 표면, 유두 변화, 통증 위치와 지속 시간을 시진으로 확인합니다.',
      '빈혈, 비타민 결핍, 당뇨병, 칸디다증, 구강건조, 알레르기, 약물 복용 여부를 함께 점검합니다.',
      '눈에 띄는 병변이 없지만 통증이 지속되면 구강 작열감 증후군과 다른 원인을 감별합니다.',
    ],
    treatment: [
      {
        approach: '원인 질환 교정',
        description:
          '영양 결핍, 빈혈, 당뇨병, 칸디다증, 구강건조처럼 교정 가능한 원인을 먼저 찾아 치료하는 것이 우선입니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '양성 변화의 보존적 관리',
        description:
          '혀 변색이나 일부 양성 변화는 혀 위생 관리, 자극 물질 회피, 흡연 중단, 구강건조 관리로 완화될 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '설통·작열감의 증상 조절',
        description:
          '구강 작열감은 다른 원인을 배제한 뒤 증상 완화와 생활 조정 중심으로 접근하며, 지속 통증은 전문 평가가 필요합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['식사와 말하기 불편', '미각 변화', '불안과 삶의 질 저하', '기저 전신질환 진단 지연'],
    prognosis:
      '양성 혀 변화는 경과 관찰과 원인 교정으로 호전되거나 무해하게 지속될 수 있습니다. 다만 지속적 설통이나 비정상 병변은 원인 평가가 필요합니다.',
    prevention: [
      '혀와 구강을 청결하게 유지하고, 자극적인 음식과 담배는 피합니다.',
      '반복되는 입마름, 영양 결핍, 전신질환은 조기에 관리합니다.',
      '지속적 설통이나 설명되지 않는 혀 변화는 진료를 받습니다.',
    ],
    epidemiology: {
      trend:
        '선택한 공공 자료는 K14 전체 범주의 단일 유병률을 제시하지 않으며, 혀 통증과 작열감은 다른 원인을 먼저 배제해야 하는 임상 증상으로 설명합니다.',
    },
    patient_friendly_summary:
      '혀의 색이나 표면 변화는 대부분 심각하지 않을 수 있지만, 오래 가는 통증이나 화끈거림은 빈혈·입마름·감염 같은 원인을 확인해볼 필요가 있습니다.',
    external: {
      pubmed_query: 'glossitis tongue disorders burning mouth syndrome K14',
      youtube_query: '설염 설통 구강작열감',
      references: [
        {
          title: '혀 변색 및 기타 변화 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%ED%98%80-%EB%B3%80%EC%83%89-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EB%B3%80%ED%99%94',
          type: 'textbook',
          year: 2024,
        },
        {
          title: '구강 작열감 증후군 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EC%9E%91%EC%97%B4%EA%B0%90-%EC%A6%9D%ED%9B%84%EA%B5%B0',
          type: 'textbook',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: '혀 변색 및 기타 변화 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%ED%98%80-%EB%B3%80%EC%83%89-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EB%B3%80%ED%99%94',
          year: 2024,
          note: '혀 색 변화와 표면 변화, 전신질환 연관성을 병태생리와 감별 포인트에 반영했습니다.',
        },
        {
          title: '구강 작열감 증후군 - MSD 매뉴얼 - 일반인용',
          url: 'https://www.msdmanuals.com/ko/home/%EA%B5%AC%EA%B0%95-%EB%B0%8F-%EC%B9%98%EC%95%84-%EC%9E%A5%EC%95%A0/%EC%9E%85%EC%88%A0-%EB%B0%8F-%ED%98%80-%EC%9E%A5%EC%95%A0/%EA%B5%AC%EA%B0%95-%EC%9E%91%EC%97%B4%EA%B0%90-%EC%A6%9D%ED%9B%84%EA%B5%B0',
          year: 2024,
          note: '구강 작열감의 원인 감별과 지속 통증의 평가 필요성을 K14 상위 설명으로 보수적으로 요약했습니다.',
        },
      ],
    },
  },
  K00: {
    code: 'K00',
    name_en: 'Disorders of tooth development and eruption',
    synonyms_ko: ['치아 발육장애', '치아 맹출장애'],
    definition:
      'K00은 치아 수, 크기, 형태, 구조, 광화, 맹출 시기에 생기는 선천성 또는 발달성 이상을 묶는 범주입니다. 결손치, 과잉치, 법랑질·상아질 형성 이상, 맹출 지연처럼 서로 다른 하위 상태가 함께 포함됩니다.',
    pathophysiology:
      '치아가 형성되는 과정(odontogenesis)이나 맹출 경로에 이상이 생기면 치아의 수·형태·강도·맹출 시기가 달라질 수 있습니다. 일부는 유전성 구조 이상이고, 일부는 국소 방해물이나 전신 발달 문제와 연결됩니다.',
    etiology: [
      '유전 요인과 가족력',
      '법랑질·상아질 형성에 영향을 주는 발달 이상',
      '맹출 경로를 방해하는 잔존 유치, 과잉치, 공간 부족',
      '내분비·증후군성 질환 등 전신 발달 문제',
    ],
    risk_factors: ['가족력', '발달·유전 질환 병력', '맹출 지연을 보이는 영유아·소아', '과잉치 또는 잔존 유치'],
    anatomy_involved: ['법랑질', '상아질', '치근과 치배', '유치와 영구치의 맹출 경로'],
    symptoms: [
      {
        name: '치아가 늦게 나거나 아예 보이지 않고, 치아 수가 적거나 많아 보일 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '치아 모양이나 색이 비정상적이거나 쉽게 닳고 깨지며, 배열 이상이나 교합 문제로 이어질 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '맹출 시기와 순서, 가족력, 동반 발달 이상을 확인합니다.',
      '구강검진과 치과 방사선 사진으로 결손치, 과잉치, 구조 이상, 맹출 방해 요소를 평가합니다.',
      '치아 강도나 색 변화가 뚜렷하면 유전성 구조 이상 여부를 함께 고려합니다.',
    ],
    treatment: [
      {
        approach: '조기 발견과 주기적 추적 관찰',
        description:
          '맹출 지연이나 치아 수·형태 이상은 성장 단계에 따라 경과가 달라질 수 있어, 소아·청소년 시기에 치과 추적 관찰과 영상 평가가 중요합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '보존 치료와 교정·공간 관리',
        description:
          '약한 법랑질이나 상아질은 불소 도포, 수복 치료, 마모 보호가 필요할 수 있고, 결손치·과잉치·맹출 이상은 공간 유지나 교정 계획이 함께 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['부정교합', '치아 민감도와 빠른 마모', '수복 치료 필요 증가', '심미 및 발음 문제'],
    prognosis:
      '예후는 하위 유형에 따라 다르지만, 조기에 발견해 치아 보호와 맹출·교합 관리를 시작하면 기능 손실과 합병증을 줄일 수 있습니다.',
    prevention: [
      '유전성·발달성 이상은 완전한 예방보다 조기 발견이 더 중요합니다.',
      '첫 치아가 난 뒤 6개월 이내, 늦어도 12개월 안에 첫 치과 검진을 받는 것이 도움이 됩니다.',
      '맹출 지연이나 치아 형태 이상이 보이면 기다리기만 하지 말고 치과 상담을 받습니다.',
    ],
    patient_friendly_summary:
      'K00은 치아가 만들어지고 나는 과정에서 생기는 여러 이상을 묶는 범주입니다. 치아가 늦게 나거나 모양·색·강도가 다를 수 있어서, 소아 시기부터 조기에 확인하면 이후 교합 문제와 마모를 줄이는 데 도움이 됩니다.',
    external: {
      pubmed_query: 'tooth development eruption disorders enamel dentin K00',
      youtube_query: '치아 발육장애 맹출장애',
      references: [
        {
          title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/003061.htm',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Tooth - abnormal shape | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/003064.htm',
          type: 'official',
          year: 2024,
        },
        {
          title: 'When Does Teething Start? | HealthyChildren.org',
          url: 'https://www.healthychildren.org/English/ages-stages/baby/teething-tooth-care/Pages/Teething-4-to-7-Months.aspx',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Tooth formation - delayed or absent | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/003061.htm',
          year: 2024,
          note: '맹출 지연, 결손, 관련 전신 질환과 상담 시점을 root overview 수준으로 반영했습니다.',
        },
        {
          title: 'Tooth - abnormal shape | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/003064.htm',
          year: 2024,
          note: '치아 형태 이상과 영상 평가 필요성을 범주 설명에 보수적으로 사용했습니다.',
        },
        {
          title: 'When Does Teething Start? | HealthyChildren.org',
          url: 'https://www.healthychildren.org/English/ages-stages/baby/teething-tooth-care/Pages/Teething-4-to-7-Months.aspx',
          year: 2024,
          note: '정상 맹출 범위와 조기 치과 방문 조언을 예방/환자 요약에 반영했습니다.',
        },
      ],
    },
  },
  K06: {
    code: 'K06',
    name_en: 'Other disorders of gingiva and edentulous alveolar ridge',
    synonyms_ko: ['잇몸의 기타 장애', '무치성 치조융기 장애'],
    definition:
      'K06은 치은퇴축, 치은비대, 외상이나 의치 자극과 연관된 잇몸·무치성 치조융기 병변처럼, K05 치은염·치주질환으로 분류되지 않는 잇몸 문제를 묶는 범주입니다.',
    anatomy_involved: ['치은', '치근 노출 부위', '무치성 치조융기', '의치가 닿는 구강 점막'],
    symptoms: [
      {
        name: '잇몸이 내려가 치아 뿌리가 드러나고, 찬 것에 시리거나 양치할 때 불편할 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '잇몸이 붓거나 덮여서 치아가 작아 보이고, 의치 밑 잇몸이 붉고 아플 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    prevention: [
      '부드러운 칫솔과 과도하지 않은 힘으로 양치합니다.',
      '정기적으로 치석을 관리하고 약물로 잇몸이 붓는지 관찰합니다.',
      '의치가 헐겁거나 눌리면 참고 사용하지 말고 조정받습니다.',
    ],
    patient_friendly_summary:
      'K06은 염증성 잇몸병 말고도 잇몸이 내려가거나, 붓거나, 의치 때문에 자극받는 문제를 포함하는 범주입니다. 뿌리 시림이나 잇몸 부종이 계속되면 단순 민감증으로 넘기지 말고 원인을 확인하는 것이 좋습니다.',
    external: {
      pubmed_query: 'gingival recession gingival hyperplasia edentulous ridge lesions K06',
      youtube_query: '잇몸 퇴축 잇몸 비대 의치 자극',
      references: [
        {
          title: 'Gum Recession: Causes, Prevention, Surgery & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/22753-gum-recession',
          type: 'official',
          year: 2025,
        },
        {
          title: 'Gingival Hyperplasia: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/gingival-hyperplasia',
          type: 'official',
          year: 2025,
        },
        {
          title: 'Dental Appliances - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/home/mouth-and-dental-disorders/tooth-disorders/dental-appliances',
          type: 'textbook',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Gum Recession: Causes, Prevention, Surgery & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/22753-gum-recession',
          year: 2025,
          note: '치은퇴축의 증상, 위험 요인, 조기 치료 필요성을 root 개요에 반영했습니다.',
        },
        {
          title: 'Gingival Hyperplasia: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/gingival-hyperplasia',
          year: 2025,
          note: '약물·염증 연관 잇몸 과증식과 수술 가능성을 보수적으로 요약했습니다.',
        },
        {
          title: 'Dental Appliances - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/home/mouth-and-dental-disorders/tooth-disorders/dental-appliances',
          year: 2024,
          note: '무치성 치조융기와 의치 하방 점막 자극의 patient-facing 설명을 보강했습니다.',
        },
      ],
    },
  },
  K07: {
    code: 'K07',
    name_en: 'Dentofacial anomalies including malocclusion',
    synonyms_ko: ['치아얼굴이상', '부정교합 포함 악안면 이상'],
    definition:
      'K07은 턱 크기와 위치 관계, 치열궁과 치아 위치의 이상, 부정교합, 그리고 일부 턱관절 기능 문제까지 포함하는 넓은 분류 범주입니다. 하나의 단일 질환이라기보다 정렬과 기능 문제를 묶는 umbrella code에 가깝습니다.',
    treatment: [
      {
        approach: '하위 유형에 맞는 교정·보존·수술 계획',
        description:
          'K07의 치료는 하위 유형에 따라 교정 치료, 성장기 습관 교정, 턱관절 보존 치료, 악교정수술 평가처럼 서로 다르게 나뉩니다. root 단계에서는 단일 치료 공식보다 정확한 subtype 판단이 더 중요합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    patient_friendly_summary:
      'K07은 단순히 치아가 삐뚤어진 문제만이 아니라, 턱 크기·위치 차이와 턱관절 기능 문제까지 포함하는 넓은 범주입니다. 그래서 어떤 사람은 교정이 중심이고, 어떤 사람은 턱관절 관리나 수술 평가가 더 중요할 수 있습니다.',
    external: {
      pubmed_query: 'malocclusion dentofacial anomalies temporomandibular disorders K07',
      youtube_query: '부정교합 턱관절장애 악교정수술',
      references: [
        {
          title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001058.htm',
          type: 'official',
          year: 2024,
        },
        {
          title: 'TMD | NIDCR',
          url: 'https://www.nidcr.nih.gov/health-info/tmd',
          type: 'official',
          year: 2025,
        },
        {
          title: 'Orthodontics | NHS',
          url: 'https://www.nhs.uk/tests-and-treatments/orthodontics/',
          type: 'official',
          year: 2023,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Malocclusion of teeth | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001058.htm',
          year: 2024,
          note: '부정교합 증상, 검사, 교정·발치·수술 같은 큰 치료 축을 반영했습니다.',
        },
        {
          title: 'TMD | NIDCR',
          url: 'https://www.nidcr.nih.gov/health-info/tmd',
          year: 2025,
          note: 'K07이 TMJ 기능 문제를 포함할 수 있다는 점과 보존적 치료 우선 원칙을 반영했습니다.',
        },
        {
          title: 'Orthodontics | NHS',
          url: 'https://www.nhs.uk/tests-and-treatments/orthodontics/',
          year: 2023,
          note: '환자 친화적인 교정 적응증과 성장기 조기 발견 문구를 보강했습니다.',
        },
      ],
    },
  },
  K09: {
    code: 'K09',
    name_en: 'Cysts of oral region, not elsewhere classified',
    synonyms_ko: ['구강영역의 낭', '구강·턱 낭성 병변'],
    definition:
      'K09는 치근낭(K04.8)을 제외한 구강영역의 낭성 병변을 묶는 범주입니다. 발육성 치성낭, 비치원성 낭, 턱의 기타 낭처럼 하위 유형이 서로 달라서 root 단계에서는 공통 특징만 얇게 설명하는 편이 안전합니다.',
    pathophysiology:
      '이 범주의 낭은 치아 형성과 관련된 상피 잔존물이나 다른 발달성 조직에서 시작해 천천히 커질 수 있습니다. 크기가 커지면 뼈를 얇게 만들거나 주변 치아 위치를 바꿀 수 있습니다.',
    symptoms: [
      {
        name: '작은 낭은 증상 없이 X-ray에서 우연히 발견될 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '크기가 커지면 턱 부종, 불편감, 치아 이동, 맹출 지연, 드물게 감염성 통증이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '파노라마 X-ray나 CBCT로 낭의 위치와 치아·뼈와의 관계를 확인합니다.',
      '낭의 하위 유형은 영상 소견과 수술 후 병리 결과를 함께 보고 판단합니다.',
      '무증상이라도 매복치 주변 음영이나 전치부 구개 부종이 있으면 평가가 필요합니다.',
    ],
    treatment: [
      {
        approach: '영상 추적과 구강악안면외과 평가',
        description:
          '증상이 없더라도 낭성 병변은 치아와 턱뼈에 영향을 줄 수 있어, 영상 추적이나 구강악안면외과 상담이 필요할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '낭 적출 또는 감압술',
        description:
          '하위 유형과 크기에 따라 낭을 제거하거나 감압술을 시행할 수 있으며, 병리 확인이 치료의 일부가 됩니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    prognosis:
      '대부분 양성 병변이지만 subtype에 따라 재발 가능성과 수술 범위가 달라집니다. 그래서 root 설명보다 하위 코드 평가가 더 중요합니다.',
    patient_friendly_summary:
      'K09는 입안과 턱 부위의 여러 낭성 병변을 묶는 범주입니다. 통증이 없어도 X-ray에서 발견될 수 있고, 커지면 치아 위치나 턱뼈에 영향을 줄 수 있어 정확한 종류를 확인하는 것이 중요합니다.',
    external: {
      pubmed_query: 'odontogenic cyst oral region cyst dentigerous nasopalatine K09',
      youtube_query: '턱 낭종 치성낭 비치원성 낭',
      references: [
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Dentigerous Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/dentigerous-cyst',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Nasopalatine Duct Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/nasopalatine-duct-cyst',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          year: 2024,
          note: '턱 낭성 병변의 공통 증상, 영상 발견, 수술 가능성을 root 개요에 반영했습니다.',
        },
        {
          title: 'Dentigerous Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/dentigerous-cyst',
          year: 2024,
          note: '발육성 치성낭의 대표 예로 매복치 주변 병변 설명을 보강했습니다.',
        },
        {
          title: 'Nasopalatine Duct Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/nasopalatine-duct-cyst',
          year: 2025,
          note: '비치원성 낭까지 포함되는 umbrella code라는 점을 설명하는 데 사용했습니다.',
        },
      ],
    },
  },
  K10: {
    code: 'K10',
    name_en: 'Other diseases of jaws',
    synonyms_ko: ['턱의 기타 질환', '턱뼈 질환'],
    definition:
      'K10은 턱의 발육장애, 염증성 턱뼈 병변, 치조염, 약물 관련 턱뼈괴사처럼 K07과 K09에 따로 분류되지 않는 다양한 턱 질환을 묶는 범주입니다. root 단계에서는 공통된 증상과 평가 원칙만 설명하는 것이 안전합니다.',
    anatomy_involved: ['상악', '하악', '치조골', '발치와', '주변 연조직'],
    symptoms: [
      {
        name: '턱 통증, 부종, 씹기 불편, 입 벌리기 불편, 교합 변화가 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
      {
        name: '발치 후 심한 통증, 입 냄새, 고름, 치유 지연, 드물게 노출된 뼈가 보일 수 있습니다.',
        severity: 'severe',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '최근 발치, 외상, 약물 복용(특히 antiresorptive/anticancer drugs), 감염 병력을 확인합니다.',
      '파노라마 X-ray나 CT로 턱뼈와 발치와 상태를 평가합니다.',
      '원인 범위가 넓어 구강악안면외과나 관련 전문 진료가 필요할 수 있습니다.',
    ],
    patient_friendly_summary:
      'K10은 턱뼈에 생기는 여러 문제를 묶는 범주입니다. 어떤 경우는 발치 후 생기는 건조와나 턱뼈괴사처럼 빠른 조치가 중요하고, 어떤 경우는 발달 이상처럼 장기 계획이 필요하므로, 턱 통증과 부종을 단순 치통으로만 보면 놓치기 쉽습니다.',
    external: {
      pubmed_query: 'jaw disease osteonecrosis dry socket alveolar osteitis K10',
      youtube_query: '턱뼈괴사 건성와 치조염',
      references: [
        {
          title: 'Jaw Injuries | Jaw Disorders | MedlinePlus',
          url: 'https://medlineplus.gov/jawinjuriesanddisorders.html',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Medication-Related Osteonecrosis of the Jaw (MRONJ) - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/home/mouth-and-dental-disorders/urgent-dental-problems/medication-related-osteonecrosis-of-the-jaw-mronj',
          type: 'textbook',
          year: 2024,
        },
        {
          title: 'Dry Socket: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/17731-dry-socket',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Jaw Injuries | Jaw Disorders | MedlinePlus',
          url: 'https://medlineplus.gov/jawinjuriesanddisorders.html',
          year: 2024,
          note: '턱 질환의 공통 구조와 영상 평가 필요성을 root summary에 반영했습니다.',
        },
        {
          title: 'Medication-Related Osteonecrosis of the Jaw (MRONJ) - MSD Manual Consumer Version',
          url: 'https://www.msdmanuals.com/home/mouth-and-dental-disorders/urgent-dental-problems/medication-related-osteonecrosis-of-the-jaw-mronj',
          year: 2024,
          note: '턱뼈괴사 slice를 통해 노출골, 통증, 약물 연관성을 보강했습니다.',
        },
        {
          title: 'Dry Socket: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/17731-dry-socket',
          year: 2025,
          note: '발치 후 건성와/치조염의 통증, 위험 인자, 관리 원칙을 반영했습니다.',
        },
      ],
    },
  },
  'K06.0': {
    code: 'K06.0',
    name_en: 'Gingival recession',
    synonyms_ko: ['치은퇴축', '잇몸 내려감'],
    definition:
      '치은퇴축은 잇몸이 치아에서 점점 물러나면서 치근 표면이 드러나는 상태입니다. 단순 미용 문제가 아니라 시림, 치근 우식, 청결 어려움으로 이어질 수 있습니다.',
    pathophysiology:
      '잇몸 가장자리가 내려가면 원래 잇몸으로 덮여 있던 치근 표면이 노출됩니다. 이 부위는 법랑질보다 약해서 자극과 우식에 더 취약합니다.',
    etiology: ['과도한 칫솔질', '치주조직 손상 또는 과거 잇몸질환', '흡연', '치아 위치 이상이나 얇은 잇몸 조직'],
    risk_factors: ['세게 양치하는 습관', '치태·치석 관리 부족', '흡연', '잇몸이 얇은 체질', '교합 외상 가능성'],
    anatomy_involved: ['치은 변연', '노출된 치근 표면', '치경부 주변 조직'],
    symptoms: [
      {
        name: '치아가 길어 보이거나 잇몸이 내려간 것처럼 보일 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '찬 것에 시리고 양치할 때 불편하거나, 치근 우식 위험이 커질 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '구강검진으로 잇몸 경계와 치근 노출 범위를 확인합니다.',
      '잇몸질환, 양치 습관, 흡연 여부 같은 배경 요인을 함께 평가합니다.',
      '필요하면 치주검사와 치과 X-ray로 지지조직 상태를 확인합니다.',
    ],
    treatment: [
      {
        approach: '진행 억제와 민감도 관리',
        description:
          '양치 습관을 교정하고 치태를 줄이며, 민감도 완화용 관리와 치근 보호를 먼저 시행합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '치은이식 등 연조직 수술',
        description:
          '심미 문제나 시림, 치근 노출이 뚜렷하면 치은이식 같은 연조직 처치를 고려할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['치근 시림', '치근 우식', '칫솔질 불편', '심미적 불만'],
    prognosis:
      '이미 내려간 잇몸이 저절로 다시 올라오는 경우는 드물지만, 원인을 줄이면 진행 억제와 증상 완화는 충분히 가능합니다.',
    prevention: [
      '부드러운 칫솔로 과도한 힘을 주지 않고 양치합니다.',
      '치태와 치석을 정기적으로 관리합니다.',
      '흡연을 줄이고 시림이나 잇몸 후퇴가 보이면 조기에 진료를 받습니다.',
    ],
    patient_friendly_summary:
      '치은퇴축은 잇몸이 줄어들어 치아 뿌리가 보이는 상태입니다. 그냥 나이 탓으로만 넘기지 말고, 시림이나 잇몸 후퇴가 느껴지면 원인을 찾아 진행을 늦추는 것이 중요합니다.',
    external: {
      pubmed_query: 'gingival recession root sensitivity K06.0',
      youtube_query: '치은퇴축 잇몸 내려감',
      references: [
        {
          title: 'Gum Recession: Causes, Prevention, Surgery & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/22753-gum-recession',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Gum Recession: Causes, Prevention, Surgery & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/22753-gum-recession',
          year: 2025,
          note: '치근 노출, 시림, 진행 억제 중심 치료와 예방을 K06.0 설명에 반영했습니다.',
        },
      ],
    },
  },
  'K06.1': {
    code: 'K06.1',
    name_en: 'Gingival hyperplasia',
    synonyms_ko: ['치은비대', '잇몸 비대'],
    definition:
      '치은비대는 잇몸 조직이 비정상적으로 두꺼워지거나 커져서 치아를 덮는 상태입니다. 약물, 염증, 유전, 호르몬 변화가 배경이 될 수 있습니다.',
    pathophysiology:
      '치은 조직이 과증식하면 치아가 짧아 보이고 음식물과 치태가 더 잘 끼게 됩니다. 이 때문에 청결이 더 어려워지고 염증이 악화될 수 있습니다.',
    etiology: ['약물 유발', '만성 염증과 치태', '유전성 경향', '호르몬 변화'],
    risk_factors: ['항경련제 복용', '면역억제제 또는 칼슘통로차단제 복용', '구강위생 불량', '호르몬 변화'],
    anatomy_involved: ['치은', '치간유두', '치아 주변 연조직'],
    symptoms: [
      {
        name: '잇몸이 붓고 두꺼워져 치아가 짧아 보일 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '잇몸 출혈, 청결 곤란, 저작 불편, 심하면 치아를 덮는 과증식이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '구강검진으로 잇몸 과증식의 범위와 염증 정도를 확인합니다.',
      '약물 복용력과 전신 상태를 함께 묻습니다.',
      '필요하면 치석, 치주 상태, 다른 점막 병변과 감별합니다.',
    ],
    treatment: [
      {
        approach: '구강위생 개선과 원인 점검',
        description:
          '플라그를 줄이고 약물 또는 전신 요인을 점검하는 것이 우선입니다. 경우에 따라 처방 의사와 약물 조정 여부를 상의할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '치은절제 등 연조직 처치',
        description:
          '과증식이 심해서 청결이나 기능에 문제가 크면 잇몸 절제 같은 처치를 고려할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['청결 악화', '출혈', '저작 불편', '심미 문제'],
    prognosis:
      '원인을 조절하면 좋아질 수 있지만, 약물이나 유전 배경이 있으면 재발 가능성도 있어 추적 관리가 필요합니다.',
    prevention: [
      '정기적으로 치태와 치석을 관리합니다.',
      '잇몸이 갑자기 붓기 시작하면 복용 중인 약과 함께 치과 상담을 받습니다.',
      '증식이 심해지기 전 조기에 관리하면 기능 문제를 줄이기 쉽습니다.',
    ],
    patient_friendly_summary:
      '치은비대는 잇몸이 두꺼워지고 커져서 치아를 덮는 상태입니다. 단순 붓기처럼 보여도 약물이나 염증과 연결될 수 있어서, 점점 심해지면 초기에 확인하는 편이 좋습니다.',
    external: {
      pubmed_query: 'gingival hyperplasia drug induced K06.1',
      youtube_query: '치은비대 잇몸 비대',
      references: [
        {
          title: 'Gingival Hyperplasia: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/gingival-hyperplasia',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Gingival Hyperplasia: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/gingival-hyperplasia',
          year: 2025,
          note: '약물·염증·유전 관련 치은 과증식과 보존 치료/치은절제 가능성을 반영했습니다.',
        },
      ],
    },
  },
  'K07.6': {
    code: 'K07.6',
    name_en: 'Temporomandibular disorders',
    synonyms_ko: ['턱관절장애', 'TMJ 장애'],
    definition:
      '턱관절장애는 턱관절과 저작근에 생기는 통증·기능 이상을 묶는 범주입니다. 턱 통증, 뻣뻣함, 입 벌리기 어려움, 저작 불편이 대표적입니다.',
    pathophysiology:
      '증상은 턱관절 자체, 저작근, 주변 인대와 통증 조절 기전이 함께 관여할 수 있습니다. 많은 경우 정확한 단일 원인은 알기 어렵습니다.',
    risk_factors: ['턱 외상', '통증에 대한 민감성', '스트레스와 이악물기', '중년 여성에서 더 흔함'],
    anatomy_involved: ['턱관절(TMJ)', '저작근', '하악과 두개골 연결 구조'],
    symptoms: [
      {
        name: '턱 통증, 턱 뻣뻣함, 씹기 불편이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
      {
        name: '입이 잘 안 벌어지거나 잠기는 느낌, 통증 있는 딱딱 소리, 얼굴·목으로 퍼지는 통증이 동반될 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '증상 위치, 유발 요인, 지속 기간을 자세히 묻습니다.',
      '턱관절과 저작근의 압통, 클릭음, 개구 범위를 진찰합니다.',
      '필요하면 X-ray, CT, MRI 같은 영상검사를 고려합니다.',
    ],
    treatment: [
      {
        approach: '자가관리와 보존적 치료',
        description:
          '부드러운 음식, 온찜질 또는 냉찜질, 턱 스트레칭, NSAIDs 같은 보존 치료가 우선입니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '물리치료·행동치료·보조장치',
        description:
          '증상이 오래가면 물리치료, 스트레스 관리, 스플린트 같은 보조장치를 고려할 수 있지만, 영구적으로 bite를 바꾸는 장치는 신중해야 합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    complications: ['만성 통증', '두통', '저작 기능 제한', '수면과 삶의 질 저하'],
    prognosis:
      '많은 턱관절장애는 일시적이거나 보존 치료로 호전되지만, 일부는 만성화될 수 있어 무리한 자가교정보다 정확한 평가가 중요합니다.',
    prevention: [
      '턱을 과하게 악무는 습관과 껌 씹기를 줄입니다.',
      '턱 통증이 심할 때는 딱딱한 음식과 과도한 하품을 피합니다.',
      '오래가는 통증은 참고 버티기보다 보존 치료 중심으로 평가받습니다.',
    ],
    patient_friendly_summary:
      '턱관절장애는 턱관절 자체와 씹는 근육에서 생기는 통증 문제입니다. 턱이 딱딱거린다고 모두 병은 아니지만, 통증이나 입 벌림 제한이 있으면 조기에 진료를 받는 편이 좋습니다.',
    external: {
      pubmed_query: 'temporomandibular disorders K07.6',
      youtube_query: '턱관절장애 TMD TMJ',
      references: [
        {
          title: 'TMD | NIDCR',
          url: 'https://www.nidcr.nih.gov/health-info/tmd',
          type: 'official',
          year: 2025,
        },
        {
          title: 'Temporomandibular Disorders | MedlinePlus',
          url: 'https://medlineplus.gov/temporomandibulardisorders.html',
          type: 'official',
          year: 2024,
        },
        {
          title: 'TMJ disorders | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001227.htm',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'TMD | NIDCR',
          url: 'https://www.nidcr.nih.gov/health-info/tmd',
          year: 2025,
          note: '보존 치료 우선 원칙과 비가역적 교합 변경 치료에 대한 신중한 접근을 반영했습니다.',
        },
        {
          title: 'Temporomandibular Disorders | MedlinePlus',
          url: 'https://medlineplus.gov/temporomandibulardisorders.html',
          year: 2024,
          note: '증상, 위험군, 검사와 치료의 patient-facing 구조를 반영했습니다.',
        },
        {
          title: 'TMJ disorders | MedlinePlus Medical Encyclopedia',
          url: 'https://medlineplus.gov/ency/article/001227.htm',
          year: 2024,
          note: '턱관절과 저작근 구조, 통증, 개구 제한 설명을 보강했습니다.',
        },
      ],
    },
  },
  'K09.0': {
    code: 'K09.0',
    name_en: 'Developmental odontogenic cysts',
    synonyms_ko: ['발육성 치성낭', '대표 예: 함치성낭'],
    definition:
      '발육성 치성낭은 치아 형성과 관련된 조직에서 생기는 낭성 병변을 묶는 범주입니다. 환자에게 가장 익숙한 대표 예는 매복치 주위에 생기는 함치성낭입니다.',
    pathophysiology:
      '치아가 맹출하지 못하고 남아 있을 때 치관 주변에 액체가 모이면서 낭이 형성될 수 있습니다. 시간이 지나면 턱뼈를 팽창시키거나 주변 치아를 밀 수 있습니다.',
    anatomy_involved: ['매복치 주변 낭강', '치관 주위 조직', '턱뼈'],
    symptoms: [
      {
        name: '작은 낭은 증상 없이 X-ray에서 우연히 발견될 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '커지면 턱 부종, 치아 이동, 맹출 지연, 드물게 통증이나 감염이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '파노라마 X-ray나 CBCT에서 매복치 치관 주위의 낭성 음영을 확인합니다.',
      '정확한 subtype은 수술 후 병리 확인이 필요할 수 있습니다.',
      '매복치 주변 병변이면 구강악안면외과 평가를 고려합니다.',
    ],
    treatment: [
      {
        approach: '구강악안면외과 평가',
        description:
          '크기와 위치, 인접 치아 관계를 보고 관찰, 감압술, 적출술 중 적절한 계획을 세웁니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '낭 적출과 치아 관리',
        description:
          '대표 예인 함치성낭은 낭 제거와 함께 매복치 관리가 같이 논의되는 경우가 많습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    prognosis:
      '대부분 양성이지만 크기와 위치에 따라 수술 범위가 달라지고, 추적 촬영이 필요할 수 있습니다.',
    patient_friendly_summary:
      'K09.0은 치아를 만드는 조직에서 생기는 낭을 묶는 범주입니다. 특히 매복치 주변에서 우연히 발견되는 경우가 많아서, 통증이 없더라도 영상에서 보이면 정확한 평가가 중요합니다.',
    external: {
      pubmed_query: 'developmental odontogenic cyst dentigerous cyst K09.0',
      youtube_query: '함치성낭 치성낭',
      references: [
        {
          title: 'Dentigerous Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/dentigerous-cyst',
          type: 'official',
          year: 2024,
        },
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Dentigerous Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/dentigerous-cyst',
          year: 2024,
          note: 'K09.0의 대표 patient-facing example로 함치성낭 설명을 반영했습니다.',
        },
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          year: 2024,
          note: '턱 낭의 영상 발견과 수술 평가 필요성을 보강했습니다.',
        },
      ],
    },
  },
  'K09.1': {
    code: 'K09.1',
    name_en: 'Developmental cysts of oral region, non-odontogenic',
    synonyms_ko: ['비치원성 발육성 낭', '대표 예: 비구개관낭'],
    definition:
      'K09.1은 치아를 만드는 조직이 아닌 구강영역 발달 구조에서 생기는 낭을 묶는 범주입니다. 환자에게 가장 설명하기 쉬운 대표 예는 앞쪽 구개부의 비구개관낭입니다.',
    pathophysiology:
      '배아 발달 과정의 잔존 구조에서 낭이 자라며, 전치부 구개 쪽에 천천히 커질 수 있습니다. 작을 때는 무증상인 경우도 흔합니다.',
    anatomy_involved: ['앞쪽 구개부', '비구개관 부위', '상악 전치부 주변'],
    symptoms: [
      {
        name: '증상 없이 우연히 발견될 수 있습니다.',
        severity: 'mild',
        is_pathognomonic: false,
      },
      {
        name: '앞니 뒤쪽 입천장 부위의 부종, 압박감, 배농, 통증이 생길 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '전치부 구개 쪽 부종이나 X-ray 음영을 확인합니다.',
      '치근단 병변과 감별하기 위해 치아 생활력과 영상 소견을 함께 봅니다.',
      '정확한 진단은 병리 결과가 필요할 수 있습니다.',
    ],
    treatment: [
      {
        approach: '영상 평가와 수술 상담',
        description:
          '크기와 증상에 따라 구강악안면외과에서 적출술 여부를 평가합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    prognosis:
      '대체로 양성이며 치료 후 경과가 좋은 편이지만, 정확한 감별과 추적이 필요합니다.',
    patient_friendly_summary:
      'K09.1은 치아와 직접 관련되지 않은 발육성 낭을 묶는 범주입니다. 특히 앞니 뒤쪽 입천장에 반복되는 부종이나 X-ray 이상이 보이면 치근단 염증으로만 넘기지 말고 확인하는 것이 좋습니다.',
    external: {
      pubmed_query: 'nasopalatine duct cyst K09.1',
      youtube_query: '비구개관낭 구개낭종',
      references: [
        {
          title: 'Nasopalatine Duct Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/nasopalatine-duct-cyst',
          type: 'official',
          year: 2025,
        },
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          type: 'official',
          year: 2024,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Nasopalatine Duct Cyst | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/nasopalatine-duct-cyst',
          year: 2025,
          note: 'K09.1의 대표 example로 앞쪽 구개부 비치원성 낭 설명을 반영했습니다.',
        },
        {
          title: 'Jaw Cysts and Tumors | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/jaw-cysts-tumors',
          year: 2024,
          note: '영상평가와 수술적 평가 필요성을 보강했습니다.',
        },
      ],
    },
  },
  'K10.3': {
    code: 'K10.3',
    name_en: 'Alveolitis of jaws (alveolar osteitis, dry socket)',
    synonyms_ko: ['턱의치조염', '건성와', '발치와 염증'],
    definition:
      '건성와(alveolar osteitis)는 발치 후 혈병이 제대로 유지되지 않아 발치와의 뼈와 신경이 노출되면서 심한 통증이 생기는 상태입니다. 흔히 발치 후 치조염으로 설명됩니다.',
    pathophysiology:
      '정상적으로는 발치 부위에 혈병이 생겨 치유를 돕지만, 혈병이 너무 일찍 떨어지거나 분해되면 뼈가 노출되어 극심한 통증이 생길 수 있습니다.',
    risk_factors: ['흡연', '빨대 사용', '강한 가글', '발치 후 구강위생 불량', '여성호르몬 제제 복용', '사랑니 발치'],
    anatomy_involved: ['발치와', '노출된 치조골', '주변 연조직'],
    symptoms: [
      {
        name: '발치 후 1~3일 사이 통증이 심해지고, 통증이 턱·귀·머리 쪽으로 퍼질 수 있습니다.',
        severity: 'severe',
        is_pathognomonic: false,
      },
      {
        name: '입 냄새, 불쾌한 맛, 텅 빈 발치 구멍처럼 보이는 소견이 동반될 수 있습니다.',
        severity: 'moderate',
        is_pathognomonic: false,
      },
    ],
    diagnostic_criteria: [
      '최근 발치 병력과 시기, 통증 양상을 확인합니다.',
      '발치와에 혈병이 없거나 노출골처럼 보이는지 진찰합니다.',
      '필요하면 남아 있는 치근 조각이나 다른 합병증을 X-ray로 확인합니다.',
    ],
    treatment: [
      {
        approach: '세척과 통증 조절',
        description:
          '치과에서 발치와를 세척하고 진통 관리, 진정용 드레싱을 사용할 수 있습니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
      {
        approach: '사후 관리 재교육',
        description:
          '흡연, 빨대, 과격한 가글 같은 혈병 방해 행동을 피하고 연한 음식 위주로 관리합니다.',
        evidence_level: 'Expert',
        is_insured: null,
      },
    ],
    prognosis:
      '통증은 심하지만 적절히 관리하면 대개 1주 안팎으로 호전됩니다. 통증이 밤에 잠을 깨울 정도로 심하면 재평가가 필요합니다.',
    prevention: [
      '발치 후 흡연과 빨대를 피합니다.',
      '너무 세게 가글하지 않고 안내받은 사후 관리 지침을 따릅니다.',
      '증상이 심하거나 진통제로도 조절이 안 되면 발치한 치과에 바로 연락합니다.',
    ],
    patient_friendly_summary:
      '건성와는 발치 후 생길 수 있는 대표적인 통증 합병증입니다. 시간이 지나면 나아질 수 있어도 통증이 너무 심해서 잠을 못 잘 정도라면 참지 말고 세척과 통증 조절 치료를 받는 편이 훨씬 낫습니다.',
    external: {
      pubmed_query: 'dry socket alveolar osteitis K10.3',
      youtube_query: '건성와 dry socket',
      references: [
        {
          title: 'Dry Socket: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/17731-dry-socket',
          type: 'official',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'pending',
      updated_at: '2026-03-21',
      sources: [
        {
          title: 'Dry Socket: Symptoms, Causes & Treatment | Cleveland Clinic',
          url: 'https://my.clevelandclinic.org/health/diseases/17731-dry-socket',
          year: 2025,
          note: '발치 후 혈병 소실, 통증 양상, 위험 인자, 세척·드레싱 중심 치료를 K10.3 설명에 반영했습니다.',
        },
      ],
    },
  },
}
