#!/usr/bin/env node
// Serve api/ over HTTP so Paper (or a local Next.js app) can fetch it.
//
//   node scripts/serve.mjs            # http://localhost:4173
//   node scripts/serve.mjs --port 8080
//
// Directory requests resolve to index.json, and a bare path without .json gets
// .json appended — so /artists/zaya-blue works as well as /artists/zaya-blue.json.
// CORS is wide open because this only ever serves invented data.

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'api')
const argv = process.argv.slice(2)
const pi = argv.indexOf('--port')
const PORT = pi !== -1 ? parseInt(argv[pi + 1], 10) : 4173

const resolve = async (urlPath) => {
  let p = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  if (p === '/' || p === '') p = '/index.json'
  const candidates = [p, `${p}.json`, join(p, 'index.json')]
  for (const c of candidates) {
    const full = join(ROOT, c)
    if (!full.startsWith(ROOT)) continue
    try { if ((await stat(full)).isFile()) return full } catch {}
  }
  return null
}

createServer(async (req, res) => {
  const file = await resolve(req.url)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  }
  if (!file) {
    res.writeHead(404, headers)
    res.end(JSON.stringify({ error: 'not_found', path: req.url }, null, 2))
    return
  }
  res.writeHead(200, headers)
  res.end(await readFile(file))
}).listen(PORT, () => {
  console.log(`Kraft API → http://localhost:${PORT}`)
  console.log(`  http://localhost:${PORT}/                      manifest`)
  console.log(`  http://localhost:${PORT}/home`)
  console.log(`  http://localhost:${PORT}/artists/zaya-blue`)
  console.log(`  http://localhost:${PORT}/playlists/vinyl-sundays`)
})
