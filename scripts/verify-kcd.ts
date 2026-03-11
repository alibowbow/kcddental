import { readFile } from 'node:fs/promises'

import { officialKcdData } from '../lib/data/official-kcd'
import { extractOfficialEntries, LEGACY_FILE } from './kcd-core'

async function main() {
  const legacyHtml = await readFile(LEGACY_FILE, 'utf8')
  if (!legacyHtml.includes('<script id="kcdRawData" type="text/plain">')) {
    throw new Error('legacy/index.html no longer contains the expected kcdRawData script block.')
  }

  const fresh = await extractOfficialEntries()
  const generated = officialKcdData

  if (fresh.length !== generated.length) {
    throw new Error(`Official code count mismatch: generated=${generated.length}, fresh=${fresh.length}`)
  }

  for (let index = 0; index < fresh.length; index += 1) {
    const left = fresh[index]
    const right = generated[index]

    const label = `${left.code} at index ${index}`

    if (left.code !== right.code) {
      throw new Error(`Code order mismatch for ${label}: generated=${right.code}, fresh=${left.code}`)
    }

    if (left.name_ko_official !== right.name_ko_official) {
      throw new Error(`Official Korean name mismatch for ${label}`)
    }

    if (JSON.stringify(left.includes_official) !== JSON.stringify(right.includes_official)) {
      throw new Error(`Includes mismatch for ${label}`)
    }

    if (JSON.stringify(left.excludes_official) !== JSON.stringify(right.excludes_official)) {
      throw new Error(`Excludes mismatch for ${label}`)
    }

    if (JSON.stringify(left.notes_official) !== JSON.stringify(right.notes_official)) {
      throw new Error(`Notes mismatch for ${label}`)
    }

    if (JSON.stringify(left.raw_block) !== JSON.stringify(right.raw_block)) {
      throw new Error(`Raw block mismatch for ${label}`)
    }
  }

  console.log(`Verification passed for ${fresh.length} official codes.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
