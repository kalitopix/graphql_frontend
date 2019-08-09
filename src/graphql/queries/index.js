import gql from 'graphql-tag'

export const queryListUser = gql`
  query {
    user {
      id
      name
      username
      email
      birthday
      favoriteColor
      createdAt
    }
  }
`

export const queryGetUser = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      name
      username
      email
      birthday
      favoriteColor
      createdAt
    }
  }
`
