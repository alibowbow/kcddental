import type { DiseaseViewModel } from './types'

function fallbackQuery(viewModel: DiseaseViewModel) {
  return `${viewModel.official.code} ${viewModel.official.name_ko_official}`
}

export function buildPubMedUrl(viewModel: DiseaseViewModel) {
  const query = viewModel.enrichment?.external?.pubmed_query ?? fallbackQuery(viewModel)
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`
}

export function buildYoutubeUrl(viewModel: DiseaseViewModel) {
  const query = viewModel.enrichment?.external?.youtube_query ?? fallbackQuery(viewModel)
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

export function buildHiraSearchUrl(viewModel: DiseaseViewModel) {
  if (viewModel.enrichment?.external?.hira_url) {
    return viewModel.enrichment.external.hira_url
  }
  return `https://www.hira.or.kr/ebooksc/ebooksearch.do?query=${encodeURIComponent(fallbackQuery(viewModel))}`
}

export function buildWhoUrl(viewModel: DiseaseViewModel) {
  if (viewModel.enrichment?.external?.who_url) {
    return viewModel.enrichment.external.who_url
  }
  return `https://www.who.int/search?query=${encodeURIComponent(fallbackQuery(viewModel))}`
}

export function getOutboundLinks(viewModel: DiseaseViewModel) {
  const links = [
    { label: 'PubMed 검색', url: buildPubMedUrl(viewModel) },
    { label: 'YouTube 검색', url: buildYoutubeUrl(viewModel) },
    { label: 'HIRA 문서 검색', url: buildHiraSearchUrl(viewModel) },
    { label: 'WHO 검색', url: buildWhoUrl(viewModel) },
  ]

  if (viewModel.enrichment?.external?.kda_url) {
    links.push({ label: 'KDA 링크', url: viewModel.enrichment.external.kda_url })
  }

  return links
}