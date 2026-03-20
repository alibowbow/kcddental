import type { ClaimRuleEntry } from '../types'

export const claimRulesData: Record<string, ClaimRuleEntry[]> = {
  K02: [
    {
      code: 'K02',
      title: '만 5세 이상 12세 이하 영구치 우식의 광중합형 복합레진 급여',
      source_title: '광중합형 복합레진 충전의 급여기준이 변경되었다는데 어떻게 되나요? | 건강보험심사평가원',
      source_url: 'https://www.hira.or.kr/bbsDummy.do?brdBltNo=47600&brdScnBltNo=4&pgmid=HIRAA010006011000',
      effective_date: '2020-05-01',
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
      age_restrictions: '진료일 기준 만 5세 이상 12세 이하',
      denial_risk_factors: [
        '신경치료를 시행한 치아',
        '마모, 침식, 파절 등 치아우식증이 아닌 사유로 시행한 경우',
      ],
      claim_tips: [
        '동일치아에 2면 이상 우식이 있어 서로 다른 날에 충전하더라도 각 면수를 합산해 치료 종료 시점에 1회만 인정됩니다.',
        '동일치아 재충전은 재충전 당일 충전 면수의 소정점수 50% 인정 기준을 확인해야 합니다.',
      ],
      frequency_limit: '동일치아 다면 우식은 치료 종료 시점 1회 산정',
      notes:
        '관련 FAQ에 따르면 동일치아 재충전은 기준 기간에 따라 50% 산정 규칙이 적용됩니다. 세부 산정은 최신 HIRA FAQ와 고시를 함께 확인해야 합니다.',
    },
  ],
  K05: [
    {
      code: 'K05',
      title: '후속처치 없는 전악 치석제거 급여',
      source_title: '치석제거 급여안내 | 국민건강보험공단',
      source_url: 'https://www.nhis.or.kr/static/html/wbma/c/wbmac0218.html',
      effective_date: '2018-01-01',
      covered: true,
      coverage_condition:
        '만 19세 이상에서 후속 치주질환 처치 없이 전악 치석제거만으로 치료가 종료되는 경우 건강보험이 연 1회 적용됩니다.',
      claim_codes: [
        {
          code: 'U2233',
          name: '치석제거 나. 전악',
          notes: '후속 치주질환 처치 없이 전악 치석제거만으로 종료되는 경우에 해당합니다.',
        },
        {
          code: 'U2232',
          name: '치석제거 가. 1/3악당',
          notes: '만 19세 미만이라도 치주질환 수술을 위한 전단계의 전악 치석제거 및 부분 치석제거는 급여 적용 가능합니다.',
        },
      ],
      age_restrictions: '전악 치석제거는 만 19세 이상, 다만 만 19세 미만은 치주질환 수술 전단계 치석제거에 한해 별도 적용 가능',
      frequency_limit: '연 1회(매년 1월 1일~12월 31일)',
      claim_tips: [
        '전악 치석제거는 요양기관정보마당에 시술일을 사전 등록한 후 청구해야 합니다.',
        '후속 치주질환 처치가 없는 전악 치석제거 청구 시 별도의 특이사항 기재는 필요하지 않다고 NHIS FAQ에 안내돼 있습니다.',
      ],
      denial_risk_factors: [
        '구취 제거 목적',
        '치아 착색물질 제거 목적',
        '치아 교정 및 보철을 위한 예방 목적의 치석제거',
        '연 1회 초과 시행',
      ],
      notes:
        '예방 목적의 정기 스케일링은 원칙적으로 비급여이지만, 후속처치 없는 전악 치석제거는 보건복지부 장관이 정한 고시에 따라 예외적으로 급여가 적용됩니다.',
    },
  ],
}
