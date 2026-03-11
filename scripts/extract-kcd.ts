import { extractOfficialEntries, writeOfficialArtifacts, summarizeEntries } from './kcd-core'

async function main() {
  const entries = await extractOfficialEntries()
  await writeOfficialArtifacts(entries)

  const summary = summarizeEntries(entries)
  console.log('KCD extraction complete.')
  console.log(`- total codes: ${summary.total}`)
  console.log(`- primary K00-K14: ${summary.primaryCount}`)
  console.log(`- supplemental dental-related: ${summary.supplementalCount}`)

  for (const [chapterRange, count] of Object.entries(summary.chapterCounts)) {
    console.log(`- ${chapterRange}: ${count}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
