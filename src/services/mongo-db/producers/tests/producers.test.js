import { getProducers } from '../producers'

const find = jest.fn(() =>  Producer)
const limit = jest.fn(() => Producer)
const populate = jest.fn(() => Producer)
const exec = jest.fn(() => Producer)

const Producer = {
  find,
  limit,
  populate,
  exec,
}

describe('Mongo DB service > GET > producers', () => {
  beforeEach(() => {
    find.mockClear()
    limit.mockClear()
    populate.mockClear()
    exec.mockClear()
  })

  it('should limit number of producers returned', () => {
    getProducers(Producer, {}, 2)
    expect(limit.mock.calls[0][0]).toBe(2)
  })

  it('should override producers limit if other limit is set in query', () => {
    getProducers(Producer, { limit: 3 }, 2)
    expect(limit.mock.calls[0][0]).toBe(3)
  })

  it('should set the correct location lng lat filter', () => {
    getProducers(Producer, { latlng: '123,456' })

    const expected = {
      location: {
        $near: {
          $geometry: { type: "Point",  coordinates: [ '456', '123' ] },
        },
      },
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should set a minimum distance for getting producers', () => {
    getProducers(Producer, { latlng: '123,456', mindistance: '20' })

    const expected = {
      location: {
        $near: {
          $minDistance: '20',
          $geometry: { type: "Point",  coordinates: [ '456', '123' ] },
        },
      },
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should exclude producers by IDs', () => {
    getProducers(Producer, { exclude: '1,3,6' })

    const expected = {
      _id: { $nin: ['1', '3', '6'] },
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should get producers by category', () => {
    getProducers(Producer, { categories: 'category' })

    const expected = {
      categories: 'category',
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should populate the category field', () => {
    getProducers(Producer, {})
    expect(populate.mock.calls[0][0]).toEqual('categories')
  })

  it('should limit the number of reducers by the maximum limit', () => {
    getProducers(Producer, { limit: 43 }, 2, 10)
    expect(limit.mock.calls[0][0]).toBe(10)
  })
})
