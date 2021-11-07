const { nextI18NextRewrites } = require('next-i18next/rewrites')
const withTM = require('next-transpile-modules')(['gsap'])

const localeSubpaths = {
  en: 'en',
  ru: 'ru'
}

module.exports = withTM({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  images: {
    domains: ['admin.showballetmagma.com'],
  },
})
