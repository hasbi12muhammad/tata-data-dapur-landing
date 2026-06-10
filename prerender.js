// Post-build prerender: renders each SPA route to static HTML so crawlers and
// social scrapers get full markup without executing JavaScript.
//
// Flow: serve dist/ locally (SPA fallback) -> load each route in headless
// Chromium -> wait for React to render -> write rendered HTML to
// dist/<route>/index.html.
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, 'dist')
const PORT = 4178
const HOST = `http://localhost:${PORT}`

// Derive blog slugs from the articles source so new posts are picked up
// automatically without editing this file.
const articlesSrc = readFileSync(join(__dirname, 'src/blog/articles.jsx'), 'utf8')
const slugs = [...articlesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const routes = [
  '/',
  '/blog',
  '/privacy',
  '/terms',
  '/refund',
  ...slugs.map((s) => `/blog/${s}`),
]

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain',
}

// Minimal static server with SPA fallback to index.html for unknown routes.
const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  let filePath = join(DIST, urlPath)
  try {
    if (existsSync(filePath) && extname(filePath)) {
      const body = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
      return res.end(body)
    }
    const html = await readFile(join(DIST, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

await new Promise((r) => server.listen(PORT, r))

// If Chromium can't launch (e.g. a CI image without browser system libs),
// don't break the deploy — ship the plain SPA. Google still renders JS;
// only the prerender speed-up and non-JS social previews are lost.
let browser
try {
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
} catch (e) {
  console.warn(`\n⚠  Prerender skipped — could not launch Chromium: ${e.message}`)
  console.warn('   Build still succeeds and deploys as a client-rendered SPA.')
  server.close()
  process.exit(0)
}

let ok = 0
for (const route of routes) {
  const page = await browser.newPage()
  try {
    await page.goto(`${HOST}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
    await page.waitForSelector('#root > *', { timeout: 15000 })
    const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    const outDir = route === '/' ? DIST : join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), html, 'utf8')
    console.log(`  ✓ prerendered ${route}`)
    ok++
  } catch (e) {
    console.error(`  ✗ failed ${route}: ${e.message}`)
  } finally {
    await page.close()
  }
}

await browser.close()
server.close()
console.log(`\nPrerender complete: ${ok}/${routes.length} routes`)
if (ok < routes.length) process.exit(1)
