import { gql } from 'graphql-tag'

export const _getEvent = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      event {
        id
        location {
          name
          city
          address
        }
      }
    }
  }
`
