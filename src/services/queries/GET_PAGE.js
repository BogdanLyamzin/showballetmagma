import { gql } from '@apollo/client'

export const GET_PAGE = gql`
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      slug
      title
      contacts {
        email
        creativePhoto {
          altText
          caption
          id
          mimeType
          mediaItemUrl
          mediaDetails {
            width
            height
          }
        }
        phone1
        phone2
        title
        ownerPhoto {
          id
          altText
          caption
          mediaItemUrl
          mimeType
          mediaDetails {
            width
            height
          }
        }
      }
      aboutUsContent {
        formUrl
        additionalInfo
        conclusion
        title
        subTitle
        mainInfo
        mainDescription
        mainConclusion
        description
        conclusionImage {
          altText
          id
          mimeType
          mediaItemUrl
          caption(format: RAW)
          mediaDetails {
            width
            height
          }
        }
        mainConclusionImage {
          altText
          id
          mimeType
          mediaItemUrl
          caption(format: RAW)
          mediaDetails {
            width
            height
          }
        }
        topImage {
          altText
          id
          mimeType
          mediaItemUrl
          caption(format: RAW)
          mediaDetails {
            width
            height
          }
        }
        midImage {
          altText
          id
          mimeType
          mediaItemUrl
          caption(format: RAW)
          mediaDetails {
            width
            height
          }
        }
        riyadhevent {
          description
          maininfo
          logo {
            altText
            caption
            id
            mimeType
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
        eventsimages {
          altText
          caption
          id
          mimeType
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        slevent {
          description
          maininfo
          logo {
            id
            altText
            mediaItemUrl
            mimeType
            mediaDetails {
              height
              width
            }
          }
        }
      }

      homePage {
        additionalInfo
        mainInfo
        video {
          mediaItemUrl
        }
        videoWebm {
          mediaItemUrl
        }
        poster {
          id
          caption
          altText
          mediaItemUrl
          mimeType
          mediaDetails {
            width
            height
          }
        }
        mainImages {
          id
          caption
          altText
          mediaItemUrl
          mimeType
          mediaDetails {
            width
            height
          }
        }
        gallery {
          id
          caption
          altText
          mediaItemUrl
          mimeType
          mediaDetails {
            width
            height
          }
        }
        testimonialImages {
          id
          caption
          altText
          mediaItemUrl
          mimeType
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`
