import { validatorFactory } from 'helpers'

const schema = {
  username: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
  },
  name: {
    presence: true,
  },
  birthday: {
    presence: true,
  },
  favoriteColor: {
    presence: true,
  },
}

export default validatorFactory(schema)
