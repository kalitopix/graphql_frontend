import gql from 'graphql-tag'

export const mutationCreateUser = gql`
  mutation createUser($user: UserInputTypeCreate!) {
    createUser(user: $user) {
      id
      name
      username
      email
      birthday
      favoriteColor
    }
  }
`

export const mutationUpdateUser = gql`
  mutation updateUser($user: UserInputTypeUpdate!) {
    updateUser(user: $user) {
      id
      name
      username
      email
      birthday
      favoriteColor
    }
  }
`

export const mutationDeleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(user: { id: $id }) {
      id
      name
      username
      email
      birthday
      favoriteColor
    }
  }
`
