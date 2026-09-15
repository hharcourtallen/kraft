// Copy the static API and the generated artwork next to the app so Vite serves
// them as plain files. One source of truth stays in ../api and ../public/artwork.
import { cpSync, rmSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const APP = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(APP, '..')
for (const [from, to] of [
  [join(ROOT, 'api'), join(APP, 'public', 'api')],
  [join(ROOT, 'public', 'artwork'), join(APP, 'public', 'artwork')],
]) {
  rmSync(to, { recursive: true, force: true })
  mkdirSync(dirname(to), { recursive: true })
  cpSync(from, to, { recursive: true })
}
console.log('synced api/ and artwork/ into app/public')
