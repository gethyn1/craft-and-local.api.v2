import { setLocationFields } from './set-location-fields'

export const create = (Location, location) =>
  new Promise((resolve, reject) => {
    const fields = setLocationFields(location)

    const newLocation = new Location(setLocationFields(location))

    newLocation.save((err, location) => {
      if (err) {
        reject({
          statusCode: 400,
          status: 'error',
          data: {
            title: 'There was an error creating the location',
            errors: err.errors,
          },
        })
      }

      resolve({
        statusCode: 200,
        status: 'success',
        data: {
          location,
        },
      })
    })
  })
