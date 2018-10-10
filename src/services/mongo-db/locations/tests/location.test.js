import { getLocation } from '../location'

const findById = jest.fn(() =>  Location)
const populate = jest.fn(() => Location)

const Location = {
  findById,
  populate,
}

describe('Mongo DB service > GET > location', () => {
  beforeEach(() => {
    findById.mockClear()
    populate.mockClear()
  })

  it('should get location by ID', () => {
    getLocation(Location, 'id')
    expect(findById.mock.calls[0][0]).toEqual('id')
  })

  it('should populate the category field', () => {
    getLocation(Location, {})
    expect(populate.mock.calls[0][0]).toEqual('categories')
  })

  it('should populate the producer field', () => {
    getLocation(Location, {})
    expect(populate.mock.calls[1][0]).toEqual('producer')
  })
})
