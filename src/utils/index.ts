import { v4 as UUID } from 'uuid'

const IPFS_URIS = ['https://ipfs.io/ipfs', 'https://gateway.pinata.cloud/ipfs', 'https://ipfs.fleek.co/ipfs']

export const ipfsToHttp = (ipfsUrl: string) => {
  const httpPrefix = IPFS_URIS[Math.floor(Math.random() * IPFS_URIS.length)]
  const ipfsUrlSuffix = ipfsUrl.replace('ipfs://ipfs', '').replace('ipfs://', '')
  return `${httpPrefix}${ipfsUrlSuffix.startsWith('/') ? ipfsUrlSuffix : `/${ipfsUrlSuffix}`}`
}

export const generateUuid = (separator = false) => {
  if (separator) return UUID()
  return UUID().replace(/-/g, '')
}
