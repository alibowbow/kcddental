import type { FlowchartDefinition, FlowchartNode } from '../types'

const TAXONOMY_NOTE =
  '공식 KCD 분류 구조에서 그대로 파생한 교육용 분류 지도입니다. 진단이나 처치 결정을 대신하는 임상 알고리즘이 아니라, 어떤 하위 코드로 갈라지는지 빠르게 훑어보기 위한 참고용 구조입니다.'

interface TaxonomySpec {
  code: string
  title: string
  rootLabel: string
  children: Array<{ code: string; label: string }>
  note?: string
}

function buildTaxonomyFlowchart(spec: TaxonomySpec): FlowchartDefinition {
  const rootId = `${spec.code.toLowerCase()}-root`
  const nodes: FlowchartNode[] = [
    { id: rootId, label: spec.rootLabel, targetCode: spec.code },
    ...spec.children.map((child) => ({
      id: child.code.toLowerCase().replace(/\./g, '-'),
      label: `${child.code} ${child.label}`,
      targetCode: child.code,
    })),
  ]

  const edges = spec.children.map((child) => ({
    from: rootId,
    to: child.code.toLowerCase().replace(/\./g, '-'),
  }))

  return {
    code: spec.code,
    title: spec.title,
    status: 'verified',
    note: spec.note ?? TAXONOMY_NOTE,
    nodes,
    edges,
  }
}

export const flowchartData: Record<string, FlowchartDefinition> = {
  K00: buildTaxonomyFlowchart({
    code: 'K00',
    title: '치아 발육·맹출장애 분류 흐름',
    rootLabel: 'K00 치아의 발육 및 맹출장애',
    children: [
      { code: 'K00.0', label: '무치증' },
      { code: 'K00.1', label: '과잉치' },
      { code: 'K00.2', label: '치아의 크기와 형태의 이상' },
      { code: 'K00.3', label: '반상치' },
      { code: 'K00.4', label: '치아형성의 장애' },
      { code: 'K00.5', label: '유전성 치아구조 장애' },
      { code: 'K00.6', label: '치아맹출의 장애' },
      { code: 'K00.7', label: '생치증후군' },
      { code: 'K00.8', label: '기타 치아발육의 장애' },
      { code: 'K00.9', label: '상세불명의 치아발육의 장애' },
    ],
  }),
  K01: buildTaxonomyFlowchart({
    code: 'K01',
    title: '매몰치·매복치 분류 흐름',
    rootLabel: 'K01 매몰치 및 매복치',
    children: [
      { code: 'K01.0', label: '매몰치' },
      { code: 'K01.1', label: '매복치' },
    ],
  }),
  K02: {
    code: 'K02',
    title: '치아우식 분류 흐름',
    status: 'verified',
    note:
      '공식 KCD 분류와 검증된 설명을 바탕으로 만든 교육용 탐색 흐름입니다. 임상 의사결정도가 아니라, 우식 코드가 어떤 갈래로 이어지는지 빠르게 훑어보기 위한 구조입니다.',
    nodes: [
      { id: 'k02-root', label: 'K02 치아우식', targetCode: 'K02' },
      { id: 'k02-enamel', label: 'K02.0 법랑질에 제한된 우식', targetCode: 'K02.0' },
      { id: 'k02-dentin', label: 'K02.1 상아질의 우식', targetCode: 'K02.1' },
      { id: 'k02-cement', label: 'K02.2 시멘트질의 우식', targetCode: 'K02.2' },
      { id: 'k02-arrested', label: 'K02.3 정지된 치아우식', targetCode: 'K02.3' },
      { id: 'k02-other', label: 'K02.8 기타 치아우식', targetCode: 'K02.8' },
      { id: 'k02-unspecified', label: 'K02.9 상세불명의 치아우식', targetCode: 'K02.9' },
      { id: 'k04-link', label: '깊어지면 K04 치수·치근단 질환 평가로 이어질 수 있음', targetCode: 'K04' },
    ],
    edges: [
      { from: 'k02-root', to: 'k02-enamel' },
      { from: 'k02-root', to: 'k02-dentin' },
      { from: 'k02-root', to: 'k02-cement' },
      { from: 'k02-root', to: 'k02-arrested' },
      { from: 'k02-root', to: 'k02-other' },
      { from: 'k02-root', to: 'k02-unspecified' },
      { from: 'k02-dentin', to: 'k04-link' },
    ],
  },
  K03: buildTaxonomyFlowchart({
    code: 'K03',
    title: '치아경조직 기타질환 분류 흐름',
    rootLabel: 'K03 치아경조직의 기타질환',
    children: [
      { code: 'K03.0', label: '치아의 과다교모' },
      { code: 'K03.1', label: '치아의 마모' },
      { code: 'K03.2', label: '치아의 침식' },
      { code: 'K03.3', label: '치아의 병적 흡수' },
      { code: 'K03.4', label: '과시멘트질증' },
      { code: 'K03.5', label: '치아의 유착증' },
      { code: 'K03.6', label: '치아의 침착물' },
      { code: 'K03.7', label: '맹출후 색조변화' },
      { code: 'K03.8', label: '기타 명시된 치아경조직의 질환' },
      { code: 'K03.9', label: '상세불명의 치아경조직의 질환' },
    ],
  }),
  K04: {
    code: 'K04',
    title: '치수·치근단 질환 교육 흐름',
    status: 'verified',
    note:
      '대표적인 교육용 분류 흐름입니다. 모든 환자가 같은 순서로 진행하는 것은 아니며, K04 하위 코드가 어떤 단계와 병변을 나타내는지 빠르게 파악하기 위한 참고 구조입니다.',
    nodes: [
      { id: 'k04-root', label: 'K04 치수 및 치근단주위조직의 질환', targetCode: 'K04' },
      { id: 'k04-pulpitis', label: 'K04.0 치수염', targetCode: 'K04.0' },
      { id: 'k04-necrosis', label: 'K04.1 치수의 괴사', targetCode: 'K04.1' },
      { id: 'k04-degeneration', label: 'K04.2 치수변성', targetCode: 'K04.2' },
      { id: 'k04-apical-acute', label: 'K04.4 치수기원의 급성 근단치주염', targetCode: 'K04.4' },
      { id: 'k04-apical-chronic', label: 'K04.5 만성 근단치주염', targetCode: 'K04.5' },
      { id: 'k04-abscess-sinus', label: 'K04.6 동이 있는 근단주위농양', targetCode: 'K04.6' },
      { id: 'k04-abscess-nosinus', label: 'K04.7 동이 없는 근단주위농양', targetCode: 'K04.7' },
      { id: 'k04-cyst', label: 'K04.8 치근낭', targetCode: 'K04.8' },
    ],
    edges: [
      { from: 'k04-root', to: 'k04-pulpitis' },
      { from: 'k04-root', to: 'k04-degeneration' },
      { from: 'k04-pulpitis', to: 'k04-necrosis' },
      { from: 'k04-necrosis', to: 'k04-apical-acute' },
      { from: 'k04-necrosis', to: 'k04-apical-chronic' },
      { from: 'k04-apical-acute', to: 'k04-abscess-sinus' },
      { from: 'k04-apical-acute', to: 'k04-abscess-nosinus' },
      { from: 'k04-apical-chronic', to: 'k04-cyst' },
    ],
  },
  K05: {
    code: 'K05',
    title: '치은염·치주질환 분류 흐름',
    status: 'verified',
    note:
      '공식 KCD 하위 코드를 이해하기 쉽게 묶은 교육용 흐름입니다. 초기 치은염과 진행된 치주염, 기타 치주질환 분기를 빠르게 구분하는 데 초점을 둡니다.',
    nodes: [
      { id: 'k05-root', label: 'K05 치은염 및 치주질환', targetCode: 'K05' },
      { id: 'k05-acute-gingivitis', label: 'K05.0 급성 치은염', targetCode: 'K05.0' },
      { id: 'k05-chronic-gingivitis', label: 'K05.1 만성 치은염', targetCode: 'K05.1' },
      { id: 'k05-acute-periodontitis', label: 'K05.2 급성 치주염', targetCode: 'K05.2' },
      { id: 'k05-chronic-periodontitis', label: 'K05.3 만성 치주염', targetCode: 'K05.3' },
      { id: 'k05-periodontosis', label: 'K05.4 치주증', targetCode: 'K05.4' },
      { id: 'k05-other', label: 'K05.5 기타치주질환', targetCode: 'K05.5' },
      { id: 'k05-unspecified', label: 'K05.6 상세불명의 치주질환', targetCode: 'K05.6' },
    ],
    edges: [
      { from: 'k05-root', to: 'k05-acute-gingivitis' },
      { from: 'k05-root', to: 'k05-chronic-gingivitis' },
      { from: 'k05-chronic-gingivitis', to: 'k05-acute-periodontitis' },
      { from: 'k05-chronic-gingivitis', to: 'k05-chronic-periodontitis' },
      { from: 'k05-root', to: 'k05-periodontosis' },
      { from: 'k05-root', to: 'k05-other' },
      { from: 'k05-root', to: 'k05-unspecified' },
    ],
  },
  K06: buildTaxonomyFlowchart({
    code: 'K06',
    title: '잇몸·치조융기 기타장애 분류 흐름',
    rootLabel: 'K06 잇몸 및 무치성 치조융기의 기타 장애',
    children: [
      { code: 'K06.0', label: '치은퇴축' },
      { code: 'K06.1', label: '치은비대' },
      { code: 'K06.2', label: '외상 연관 병변' },
      { code: 'K06.8', label: '기타 명시된 장애' },
      { code: 'K06.9', label: '상세불명의 장애' },
    ],
  }),
  K07: buildTaxonomyFlowchart({
    code: 'K07',
    title: '치아얼굴이상·부정교합 분류 흐름',
    rootLabel: 'K07 치아얼굴이상[부정교합포함]',
    children: [
      { code: 'K07.0', label: '턱크기의 주요 이상' },
      { code: 'K07.1', label: '턱-두개골저 관계이상' },
      { code: 'K07.2', label: '치열궁 관계의 이상' },
      { code: 'K07.3', label: '치아위치의 이상' },
      { code: 'K07.4', label: '상세불명의 부정교합' },
      { code: 'K07.5', label: '치아얼굴의 기능이상' },
      { code: 'K07.6', label: '턱관절장애' },
      { code: 'K07.8', label: '기타 치아얼굴이상' },
      { code: 'K07.9', label: '상세불명의 치아얼굴이상' },
    ],
  }),
  K08: buildTaxonomyFlowchart({
    code: 'K08',
    title: '치아·지지구조 기타장애 분류 흐름',
    rootLabel: 'K08 치아 및 지지구조의 기타장애',
    children: [
      { code: 'K08.0', label: '전신적 원인에 의한 치아탈락' },
      { code: 'K08.1', label: '사고·발치·치주병에 의한 치아상실' },
      { code: 'K08.2', label: '무치성 치조융기의 위축' },
      { code: 'K08.3', label: '잔존치근' },
      { code: 'K08.8', label: '기타 명시된 장애' },
      { code: 'K08.9', label: '상세불명의 장애' },
    ],
  }),
  K09: buildTaxonomyFlowchart({
    code: 'K09',
    title: '구강영역 낭 분류 흐름',
    rootLabel: 'K09 달리 분류되지 않은 구강영역의 낭',
    children: [
      { code: 'K09.0', label: '발육성 치성낭' },
      { code: 'K09.1', label: '발육성(비치원성)낭' },
      { code: 'K09.2', label: '턱의 기타 낭' },
      { code: 'K09.8', label: '기타 구강영역의 낭' },
      { code: 'K09.9', label: '상세불명의 구강영역의 낭' },
    ],
  }),
  K10: buildTaxonomyFlowchart({
    code: 'K10',
    title: '턱의 기타 질환 분류 흐름',
    rootLabel: 'K10 턱의 기타 질환',
    children: [
      { code: 'K10.0', label: '턱의 발육장애' },
      { code: 'K10.1', label: '중심성 거대세포육아종' },
      { code: 'K10.2', label: '턱의 염증성 병태' },
      { code: 'K10.3', label: '턱의 치조염' },
      { code: 'K10.8', label: '기타 명시된 턱의 질환' },
      { code: 'K10.9', label: '상세불명의 턱의 질환' },
    ],
  }),
  K11: buildTaxonomyFlowchart({
    code: 'K11',
    title: '침샘의 질환 분류 흐름',
    rootLabel: 'K11 침샘의 질환',
    children: [
      { code: 'K11.0', label: '침샘의 위축' },
      { code: 'K11.1', label: '침샘의 비대' },
      { code: 'K11.2', label: '타액선염' },
      { code: 'K11.3', label: '침샘의 농양' },
      { code: 'K11.4', label: '침샘의 누공' },
      { code: 'K11.5', label: '타석증' },
      { code: 'K11.6', label: '침샘의 점액류' },
      { code: 'K11.7', label: '침분비의 장애' },
      { code: 'K11.8', label: '기타 침샘의 질환' },
      { code: 'K11.9', label: '상세불명의 침샘 질환' },
    ],
  }),
  K12: buildTaxonomyFlowchart({
    code: 'K12',
    title: '구내염·관련 병변 분류 흐름',
    rootLabel: 'K12 구내염 및 관련 병변',
    children: [
      { code: 'K12.0', label: '재발성 구강 아프타' },
      { code: 'K12.1', label: '구내염의 기타 형태' },
      { code: 'K12.2', label: '입의 연조직염 및 농양' },
      { code: 'K12.3', label: '입점막염' },
    ],
  }),
  K13: buildTaxonomyFlowchart({
    code: 'K13',
    title: '입술·구강점막 기타질환 분류 흐름',
    rootLabel: 'K13 입술 및 구강점막의 기타 질환',
    children: [
      { code: 'K13.0', label: '입술의 질환' },
      { code: 'K13.1', label: '볼 및 입술물림' },
      { code: 'K13.2', label: '백반 및 기타 상피장애' },
      { code: 'K13.3', label: '모발성 백반' },
      { code: 'K13.4', label: '육아종 및 유사병변' },
      { code: 'K13.5', label: '구강점막하 섬유증' },
      { code: 'K13.6', label: '자극성 증식증' },
      { code: 'K13.7', label: '기타·상세불명의 병변' },
    ],
  }),
  K14: buildTaxonomyFlowchart({
    code: 'K14',
    title: '혀의 질환 분류 흐름',
    rootLabel: 'K14 혀의 질환',
    children: [
      { code: 'K14.0', label: '설염' },
      { code: 'K14.1', label: '지도모양 혀' },
      { code: 'K14.2', label: '정중능형 설염' },
      { code: 'K14.3', label: '혀유두의 비대' },
      { code: 'K14.4', label: '혀유두의 위축' },
      { code: 'K14.5', label: '주름잡힌 혀' },
      { code: 'K14.6', label: '설통' },
      { code: 'K14.8', label: '혀의 기타 질환' },
      { code: 'K14.9', label: '상세불명의 혀의 질환' },
    ],
  }),
}
