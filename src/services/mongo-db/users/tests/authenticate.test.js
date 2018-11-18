import { authenticate } from '../authenticate'

const findOne = jest.fn(() =>  User)
const exec = jest.fn(() => User)
const comparePassword = jest.fn(() => User)

const User = {
  findOne,
  exec,
  comparePassword,
}

const email = 'user@email.com'
const password = 'password'

describe('Mongo DB service > POST > authenticate', () => {
  beforeEach(() => {
    findOne.mockClear()
    exec.mockClear()
    comparePassword.mockClear()
  })

  it('should find user by email', () => {
    authenticate(User, {}, 123, email, password)
    expect(findOne.mock.calls[0][0]).toEqual({ email })
  })
})
