import { getLocations } from '../locations'

const find = jest.fn(() =>  Location)
const limit = jest.fn(() => Location)
const populate = jest.fn(() => Location)
const exec = jest.fn(() => Location)

const Location = {
  find,
  limit,
  populate,
  exec,
}

describe('Mongo DB service > GET > locations', () => {
  beforeEach(() => {
    find.mockClear()
    limit.mockClear()
    populate.mockClear()
    exec.mockClear()
  })

  it('should limit number of locations returned', () => {
    getLocations(Location, {}, 2)
    expect(limit.mock.calls[0][0]).toBe(2)
  })

  it('should override locations limit if other limit is set in query', () => {
    getLocations(Location, { limit: 3 }, 2)
    expect(limit.mock.calls[0][0]).toBe(3)
  })

  it('should set the correct location lng lat filter', () => {
    getLocations(Location, { latlng: '123,456' })

    const expected = {
      location: {
        $near: {
          $geometry: { type: "Point",  coordinates: [ '456', '123' ] },
        },
      },
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should set a minimum distance for getting locations', () => {
    getLocations(Location, { latlng: '123,456', mindistance: '20' })

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

  it('should exclude locations by IDs', () => {
    getLocations(Location, { exclude: '1,3,6' })

    const expected = {
      _id: { $nin: ['1', '3', '6'] },
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should get locations by category', () => {
    getLocations(Location, { categories: 'category' })

    const expected = {
      categories: 'category',
    }

    expect(find.mock.calls[0][0]).toEqual(expected)
  })

  it('should populate the category field', () => {
    getLocations(Location, {})
    expect(populate.mock.calls[0][0]).toEqual('categories')
  })

  it('should populate the producer field', () => {
    getLocations(Location, {})
    expect(populate.mock.calls[1][0]).toEqual('producer')
  })

  it('should limit the number of reducers by the maximum limit', () => {
    getLocations(Location, { limit: 43 }, 2, 10)
    expect(limit.mock.calls[0][0]).toBe(10)
  })
})
