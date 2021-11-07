const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const isInternalUrl = (url) => {
  return !!url.startsWith(apiUrl || '')
}

export const getInternalUrl = (url) => {
  let result = url
    .split(apiUrl || '')
    .slice(0)
    .join('')
  return result
}

export const validateMultilingualUrl = (
  currentLanguage,
  url,
) => {
  let result = url.replace(/\/\s*$/, '')
  if (currentLanguage !== 'ua') {
    const lastThree = result.slice(-3)
    result = lastThree === `-${currentLanguage}` ? result.slice(0, -3) : result
  }
  return result
}
