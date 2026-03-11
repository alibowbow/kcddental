# Source Packs

이 폴더는 KCD 치과 레퍼런스의 향후 검증 데이터 입력용 소스팩 구조입니다.

원칙:

- 공식 원문과 보강 데이터는 분리합니다.
- 출처 URL, 발행연도, 시행일이 명확한 자료만 claim / drug / epidemiology / enrichment에 반영합니다.
- 검증 전에는 앱 데이터 파일을 비워 두고, UI만 empty state를 유지합니다.
- 저작권/사용제한 문구가 있는 문서는 raw 업로드 대신 구조화 노트로 대체합니다.

폴더 구성:

- `P0_official_kcd`: KCD 본문, 코딩지침서, 사례집, KCD-9 고시
- `P1_claim_official`: HIRA/NHIS 급여·청구 공식 문서
- `P2_patient_public`: KDCA/MOHW 공공 환자용 자료
- `P3_stats`: 국내외 통계/동향 자료
- `P4_drug_dur`: MFDS/HIRA DUR 자료
- `P5_clinical_curated_notes`: 사람이 작성한 구조화 임상 노트