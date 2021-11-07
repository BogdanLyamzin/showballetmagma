import { gql } from '@apollo/client'

export const GET_INFO = gql`
  query GetMainInfo {
    magmaSettings{
      mainInfo {
        facebook
        instagram
        ctaImage {
          id
          altText
          caption(format: RAW)
          mimeType
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        noise {
          id
          altText
          caption(format: RAW)
          mimeType
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        partners {
          id
          altText
          caption(format: RAW)
          mimeType
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`
