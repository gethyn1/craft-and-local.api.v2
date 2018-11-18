import { create } from '../create'

const save = jest.fn()

const User = () => ({
  save,
})

const email = 'user@email.com'
const password = 'password'

describe('Mongo DB service > POST > user', () => {
  beforeEach(() => {
    save.mockClear()
  })

  it('should save the user', () => {
    create(User, { email, password })
    expect(save.mock.calls.length).toBe(1)
  })
})
