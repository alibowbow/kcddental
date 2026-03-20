import type { FlowchartDefinition } from '../types'

export const flowchartData: Record<string, FlowchartDefinition> = {
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
}
