import { gql } from '@apollo/client'

export const GET_TESTIMONIALS = gql`
  query GetTestimonials($language: LanguageCodeFilterEnum!) {
    testimonials(where: { language: $language }) {
      nodes {
        id
        testimonials {
          author
          text
        }
      }
    }
  }
`
