import { pick } from 'ramda'

const pickRequiredKeys = pick([
  'location',
  'categories',
  '_id',
  'producer',
  'alias',
  'address'
])

export const getLocation = (Location, id) =>
  new Promise((resolve, reject) => {
    Location
      .findById(id)
      .populate('categories')
      .populate('producer')
      .exec((err, result) => {
        if (err) {
          return reject({
            statusCode: 400,
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        if (!result) {
          return reject({
            statusCode: 404,
            status: 'not found',
            data: {
              title: 'No location found with requested ID',
            },
          })
        }

        resolve({
          statusCode: 200,
          status: 'success',
          data: {
            location: pickRequiredKeys(result),
          },
        })
      })
  })
