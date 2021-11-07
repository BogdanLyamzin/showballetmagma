import { gql } from '@apollo/client'

export const GET_NAVIGATION = gql`
  query GetNavigation($location: MenuLocationEnum!) {
    menus(where: { location: $location }) {
      nodes {
        id
        menuItems {
          nodes {
            url
            id
            label
          }
        }
      }
    }
  }
`
