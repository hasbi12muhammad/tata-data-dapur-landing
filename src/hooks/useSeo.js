import { useEffect } from 'react'

const SITE_URL = 'https://tatadatadapur.my.id'
const DEFAULT_OG = `${SITE_URL}/assets/og-image.png`
const SITE_NAME = 'Tata Data Dapur'

function upsertMeta(selector, attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Client-side SEO head manager for this SPA.
 * Updates <title>, meta description, canonical, Open Graph / Twitter tags,
 * and injects an optional JSON-LD block scoped to the current route.
 */
export function useSeo(options) {
  const { title, description, path = '/', image, type = 'website', jsonLd } = options || {}
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image || DEFAULT_OG

    if (title) document.title = title

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertLink('canonical', url)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)

    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    let ldScript
    if (jsonLd) {
      ldScript = document.createElement('script')
      ldScript.type = 'application/ld+json'
      ldScript.setAttribute('data-seo-route', '')
      ldScript.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(ldScript)
    }

    return () => {
      if (ldScript && ldScript.parentNode) ldScript.parentNode.removeChild(ldScript)
    }
  }, [title, description, path, image, type, jsonLd])
}
