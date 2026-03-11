import type { EnrichedDiseaseEntry } from '../types'

export const enrichmentData: Record<string, EnrichedDiseaseEntry> = {
  K02: {
    code: 'K02',
    synonyms_ko: ['충치', '치아 우식증'],
    definition:
      '치아우식은 입안 세균이 음식물의 탄수화물을 분해해 만든 산으로 치아가 탈회되고 파괴되는 만성적인 구강질환입니다.',
    etiology: [
      '치면세균막 안의 세균이 당을 분해하면서 산을 만들고, 그 산이 치아 표면을 약하게 만듭니다.',
      '당분이 자주 공급되고 구강 위생이 충분하지 않으면 탈회가 반복되면서 병변이 깊어집니다.',
    ],
    risk_factors: ['잦은 당분 섭취', '구강 위생 관리 부족', '타액 분비와 완충 기능 저하'],
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
    prevention: [
      '불소 치약을 사용해 규칙적으로 칫솔질합니다.',
      '치실이나 보조 구강위생용품으로 치아 사이 음식물과 치태를 제거합니다.',
      '당분이 오래 남지 않도록 간식과 음료 섭취 습관을 조절합니다.',
      '정기적인 치과 검진과 필요한 예방 관리를 받습니다.',
    ],
    patient_friendly_summary:
      '충치는 치아 표면에 붙은 세균이 당을 분해하며 만든 산 때문에 생깁니다. 초기에 관리하면 더 깊은 통증과 치아 손실을 줄일 수 있어, 집에서의 위생관리와 정기 검진이 중요합니다.',
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
    provenance: {
      status: 'verified',
      updated_at: '2026-03-11',
      sources: [
        {
          title: '충치 | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6288',
          year: 2024,
          note: '2024-02-15 업데이트 페이지의 정의, 진단, 자가 관리 내용을 보수적으로 요약했습니다.',
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          year: 2024,
          note: '2024-03-21 업데이트 페이지의 구강병 예방 수칙을 예방 항목에 반영했습니다.',
        },
      ],
    },
  },
  K05: {
    code: 'K05',
    synonyms_ko: ['잇몸병', '치주질환'],
    definition:
      '치은염 및 치주질환은 치아를 둘러싼 잇몸과 치주조직에 생기는 염증성 질환으로, 초기에는 잇몸에 국한되지만 진행하면 잇몸뼈와 치주인대까지 손상될 수 있습니다.',
    risk_factors: [
      '치태와 치석 축적',
      '칫솔질 부족과 치아 사이 위생 관리 부족',
      '흡연, 스트레스, 당뇨병 같은 전신적 위험요인',
      '호르몬 변화나 일부 약물 복용',
    ],
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
      updated_at: '2026-03-11',
      sources: [
        {
          title: '잇몸병(치주질환) | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5716',
          year: 2025,
          note: '2025-11-17 업데이트 페이지의 정의, 증상, 검사, 치료 및 자가 관리 내용을 보수적으로 요약했습니다.',
        },
        {
          title: '구강병 예방 및 관리방법! 알려드리겠습니다! | 국가건강정보포털 | 질병관리청',
          url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6291',
          year: 2024,
          note: '2024-03-21 업데이트 페이지의 치주질환 예방 설명을 예방 항목에 반영했습니다.',
        },
      ],
    },
  },
}