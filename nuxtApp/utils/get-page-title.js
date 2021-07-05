import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Nuxt FF'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
