import type { EnrichedDiseaseEntry } from '../types'

export const enrichmentData: Record<string, EnrichedDiseaseEntry> = {
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
    complications: ['치수염', '근단 주위 염증 또는 농양', '치아 파절 및 치아 상실'],
    prognosis:
      '초기 우식은 조기에 발견해 관리하면 보존적 치료로 회복 가능성이 높습니다. 치료가 지연되면 치수 질환이나 발치로 이어질 수 있어 정기 검진이 중요합니다.',
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
    complications: ['치은 퇴축', '치조골 소실', '치아 동요와 치아 상실'],
    prognosis:
      '치은염 단계에서는 회복 가능성이 높지만, 치주염으로 진행해 잇몸뼈가 손상되면 원래 상태로 완전히 되돌리기 어렵습니다.',
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
}
