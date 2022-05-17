import defaultSettings from '@/settings.js';

const title = defaultSettings.title || 'NFT META WALL'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}