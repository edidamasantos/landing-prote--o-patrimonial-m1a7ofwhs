import { useEffect } from 'react'
import type { SeoConfig } from '@/config/seo'

interface UseSeoProps extends SeoConfig {
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

function updateOrCreateMeta(
  selector: string,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string,
) {
  let element = document.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateOrCreateLink(rel: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Hook para atualizar títulos, meta tags (Open Graph, Twitter, robots, canonical)
 * e schema.org JSON-LD de forma declarativa em SPAs React.
 */
export function useSeo({
  title,
  description,
  canonicalUrl,
  noindex = false,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  keywords,
  jsonLd,
}: UseSeoProps) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title
    }

    // 2. Standard Meta Tags
    if (description) {
      updateOrCreateMeta('meta[name="description"]', 'name', 'description', description)
    }

    if (keywords && keywords.length > 0) {
      updateOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '))
    }

    // 3. Robots (noindex, nofollow para página de agradecimento)
    const robotsValue = noindex
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    updateOrCreateMeta('meta[name="robots"]', 'name', 'robots', robotsValue)
    updateOrCreateMeta('meta[name="googlebot"]', 'name', 'googlebot', robotsValue)

    // 4. Canonical URL
    if (canonicalUrl) {
      updateOrCreateLink('canonical', canonicalUrl)
    }

    // 5. Open Graph (og:*)
    if (title) {
      updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title)
    }
    if (description) {
      updateOrCreateMeta(
        'meta[property="og:description"]',
        'property',
        'og:description',
        description,
      )
    }
    if (canonicalUrl) {
      updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    }
    updateOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', ogType)
    updateOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'pt_BR')
    updateOrCreateMeta(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      'Damasceno Santos Advocacia',
    )

    if (ogImage) {
      updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
      updateOrCreateMeta(
        'meta[property="og:image:secure_url"]',
        'property',
        'og:image:secure_url',
        ogImage,
      )
      updateOrCreateMeta('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/png')
      updateOrCreateMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
      updateOrCreateMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
      if (ogImageAlt) {
        updateOrCreateMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', ogImageAlt)
      }
    }

    // 6. Twitter Card (summary_large_image)
    updateOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    if (title) {
      updateOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    }
    if (description) {
      updateOrCreateMeta(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        description,
      )
    }
    if (ogImage) {
      updateOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
      if (ogImageAlt) {
        updateOrCreateMeta(
          'meta[name="twitter:image:alt"]',
          'name',
          'twitter:image:alt',
          ogImageAlt,
        )
      }
    }

    // 7. Schema.org JSON-LD
    let scriptTag = document.getElementById('json-ld-seo') as HTMLScriptElement | null
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'json-ld-seo'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.text = JSON.stringify(jsonLd)
    } else if (scriptTag) {
      scriptTag.remove()
    }

    return () => {
      // Ao desmontar não removemos necessariamente para evitar piscadas,
      // a próxima rota sobrescreve. Mas se tiver script específico, limpamos caso a próxima não tenha.
    }
  }, [title, description, canonicalUrl, noindex, ogType, ogImage, ogImageAlt, keywords, jsonLd])
}

/**
 * Componente declarativo SEO para conveniência JSX
 */
export function Seo(props: UseSeoProps) {
  useSeo(props)
  return null
}
