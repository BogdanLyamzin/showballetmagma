const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
    browserLanguageDetection: false,
    serverLanguageDetection: false,
    defaultLanguage: 'ua',
    otherLanguages: ['en', 'ru'],
    localeSubpaths,
    localePath: path.resolve('./public/static/locales')
})
