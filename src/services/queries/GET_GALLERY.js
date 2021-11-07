import { gql } from '@apollo/client'

export const GET_GALLERY = gql`
  query GetGallery($language: LanguageCodeFilterEnum!) {
    galleries(where: { language: $language }) {
      nodes {
        title
        slug
        gallery {
          mainInfo
          additionalInfo
          gallery {
            mediaItemUrl
            altText
            caption
            id
            mimeType
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`
