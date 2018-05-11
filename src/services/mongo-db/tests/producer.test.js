import { getProducer } from '../producer'

const findOne = jest.fn(() =>  Producer)
const populate = jest.fn(() => Producer)

const Producer = {
  findOne,
  populate,
}

describe('Mongo DB service > GET > producer', () => {
  beforeEach(() => {
    findOne.mockClear()
    populate.mockClear()
  })

  it('should get producer by user ID', () => {
    getProducer(Producer, 'user_id')
    expect(findOne.mock.calls[0][0]).toEqual({ user_id: 'user_id' })
  })

  it('should populate the category field', () => {
    getProducer(Producer, {})
    expect(populate.mock.calls[0][0]).toEqual('categories')
  })

  it('should populate the locality field', () => {
    getProducer(Producer, {})
    expect(populate.mock.calls[1][0]).toEqual('locality')
  })
})
