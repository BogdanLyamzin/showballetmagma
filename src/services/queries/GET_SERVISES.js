import { gql } from '@apollo/client'

export const GET_SERVICES = gql`
  query GetServices($language: LanguageCodeFilterEnum!) {
    services(where: { language: $language }, first: 30) {
      nodes {
        slug
        id
        title
        servicesContent {
          additionalInfo
          mainImages {
            id
            altText
            mimeType
            mediaItemUrl
            caption(format: RAW)
            mediaDetails {
              width
              height
            }
          }
          gallery {
            id
            altText
            mimeType
            mediaItemUrl
            caption(format: RAW)
            mediaDetails {
              width
              height
            }
          }
          mainInfo
        }
      }
    }
  }
`
