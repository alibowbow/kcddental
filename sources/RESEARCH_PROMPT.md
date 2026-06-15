# 자료조사 기반 빈 콘텐츠 채우기 프롬프트

이 파일은 KCD 치과 레퍼런스에서 "자료조사 → 검증된 출처 기반으로 빈 콘텐츠 채우기"를
반복 수행하기 위한 재사용 프롬프트다. 새 세션에서 이 내용을 그대로 사용한다.

---

## 역할
너는 /home/user/kcddental (치과 KCD 레퍼런스, Next.js 정적 사이트)에서
"자료조사 → 검증된 출처 기반으로 빈 콘텐츠 채우기"를 수행하는 에이전트다.
이 저장소는 출처 규율이 매우 엄격하다. 아래 원칙을 어기면 안 된다.

## 절대 원칙 (위반 금지)
1. 공식 KCD 원문(legacy/index.html에서 추출된 lib/data/official-kcd.ts)은 source of truth다. 절대 수정하지 않는다.
2. 검증된 출처(제목+URL+발행연도)가 없으면 채우지 않는다. "비어 있음"은 허용된 상태다.
3. 코드명만 보고 임상·급여·약물·유병률 사실을 추론하지 않는다.
4. 고위험 lane(청구 claim / 약물 drug / 변경이력 changelog / 역학 epidemiology)은
   source_title + source_url + (effective_date 또는 year)이 확인될 때만 입력한다.
5. 한국 특화 수치(KDCA·KNHANES·HIRA)와 글로벌 수치(WHO 등)는 섞지 말고 분리해 표기한다.
6. 불확실하거나 검증 어려운 항목은 넣지 말고 비워둔다. 양보다 정확성이 우선이다.

## 워크플로 (반드시 이 순서)
1. sources/ 에 먼저 구조화된 소스 노트를 만든다 (아래 템플릿).
2. 소스 노트가 "리뷰 가능한" 상태가 된 뒤에만 lib/data 로 옮긴다.
3. `npm run validate:data` 로 검증한다.
4. 작업은 git 브랜치 `claude/quirky-noether-611x43` 에서 한다.

## 빈 곳을 정확히 찾는 방법 (추론 금지, 자동 교차검증)
다음 스크립트로 "소스 노트가 safe라고 명시한 필드 ∩ enrichment에서 실제로 비어 있는 필드"만 추린다:

```bash
npx tsx -e "
import { enrichmentData } from './lib/data/enrichment'
import { readFileSync, readdirSync } from 'node:fs'
const fields=['definition','pathophysiology','etiology','risk_factors','anatomy_involved','symptoms','diagnostic_criteria','treatment','complications','prevention','prognosis','patient_friendly_summary']
function empty(c){const e=enrichmentData[c];if(!e)return null;return fields.filter(f=>{const v=e[f];return !(Array.isArray(v)?v.length>0:(typeof v==='string'?v.trim().length>0:Boolean(v)))})}
const dir='sources/P2_patient_public'
for(const file of readdirSync(dir).filter(f=>f.endsWith('.md')&&!['source_readme.md','next_batch.md'].includes(f))){
  const t=readFileSync(dir+'/'+file,'utf8');const m=t.match(/target code:\s*\`([^\`]+)\`/);if(!m)continue
  const code=m[1];const s=t.split('## Safe fields later')[1]
  const safe=s?[...s.matchAll(/\`([a-z_.]+)\`/g)].map(x=>x[1].split('.')[0]):[]
  const e=empty(code);if(!e)continue
  const gap=safe.filter(f=>e.includes(f)&&fields.includes(f))
  if(gap.length)console.log(code+' → '+gap.join(', '))
}
"
```

각 후보 필드는 다음 3가지를 모두 만족할 때만 채운다:
- (a) 그 코드의 소스 노트 "Safe fields later"에 명시돼 있고,
- (b) 실제로 비어 있고,
- (c) 노트의 "Verified takeaways" 중 그 필드를 직접 뒷받침하는 문장이 있다.

"implied", "fallback", "일반적으로" 같은 추론은 근거로 쓰지 않는다.

## 자료조사 방법
- WebFetch는 현재 환경에서 대부분 403으로 차단된다(KDCA·WHO·Cleveland Clinic·MedlinePlus 등).
  1차 출처 직접 fetch가 안 되면 WebSearch로 동일 수치를 2개 이상 출처에서 교차 확인한다.
- 신뢰 가능한 출처만 사용: WHO, CDC, NIH/MedlinePlus, NHS, KDCA 국가건강정보포털, KNHANES,
  HIRA/NHIS, 대학병원 질환백과, MSD Manual, StatPearls. 블로그·광고·커뮤니티는 금지.
- 이미 저장소 sources/ 에 들어있는 소스 노트의 "Verified takeaways"는 검토 완료된 자료이므로
  그대로 lib/data 반영에 사용할 수 있다(이게 가장 안전한 입력 경로다).

## 소스 노트 템플릿 (sources/P{n}_*/<code>.md)
```markdown
- target code: `K00.x`
- source title: `...`
- source url: `...`
- year: `...`

## Verified takeaways
- (검증된 사실만 한 줄씩, 인용 가능한 형태로)

## Scope note
- (이 코드에 어디까지 적용 가능한지, umbrella 코드는 일반화 금지)

## Safe fields later
- `definition`
- `symptoms`
- `diagnostic_criteria`
- (출처가 뒷받침하는 필드만 나열)
```

## 데이터 입력 위치
- 보강 콘텐츠: `lib/data/enrichment.ts` (상위 코드), `lib/data/k00-subcodes.ts`(makeK00Entry),
  `lib/data/k07-subcodes.ts`(createK07Entry/K07Config). 빌더가 필드를 안 받으면 빌더를 먼저 확장한다.
- 청구: `lib/data/claim-rules.ts` (P1_claim_official, HIRA/NHIS 고시·effective_date 필수)
- 약물: `lib/data/drug-interactions.ts` (P4_drug_dur, MFDS/HIRA DUR만)
- 변경이력: `lib/data/kcd-changelog.ts` (P0, 통계청 KCD 고시만)
- 흐름도: `lib/data/flowcharts.ts` (공식 하위 코드 구조에서 파생한 분류 지도만)
- 감별진단(differential_diagnosis): 공식 excludes(officialKcdMap[code].excludes_official /
  referenced_codes)와 기존 검증 정의에 근거. 링크 대상 코드는 반드시 데이터셋에 존재해야 한다.

## 작성 스타일
- 한국어, 환자 친화적이고 보수적인 어조. 기존 엔트리 톤·문장 길이를 그대로 따른다.
- 단정적 표현 대신 "있을 수 있습니다", "권고됩니다" 등 출처가 뒷받침하는 범위로만 서술.
- 한 배치는 좁고 정확하게. 검증 코드(K02/K04/K05/K12)가 패턴 레퍼런스다.

## 우선순위
1. sources/ 에 이미 준비됐지만 lib/data로 안 옮겨진 takeaway (가장 안전)
2. WHO/KDCA로 검증되는 역학(epidemiology) — caries·periodontal·edentulism 등
3. 공식 excludes 기반 differential_diagnosis
4. (소스 확보 시) P1 청구, P0 KCD 변경이력

보류: 검증 소스 없는 약물·청구·역학·learning은 건드리지 않는다.

## 마무리 체크 (모두 통과해야 커밋)
```bash
npm run validate:data && npm run verify:kcd && npm run lint && npm run build
npm run report:content   # 커버리지 변화 확인
```
- 추가한 모든 외부 사실에 source_title/source_url/year가 있는지
- differential_diagnosis 링크 대상 코드가 모두 존재하는지
- 공식 데이터/원문을 건드리지 않았는지

통과하면 `claude/quirky-noether-611x43` 에 명확한 커밋 메시지로 커밋하고,
사용자가 "병합"이라고 하면 main에 fast-forward 병합한다.
