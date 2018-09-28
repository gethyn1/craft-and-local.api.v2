import { setLocationFields } from './set-location-fields'

export const update = (Location, locationId, location) =>
  new Promise((resolve, reject) => {
    if (!locationId || locationId === 'undefined') {
      return reject({
        statusCode: 400,
        status: 'error',
        data: {
          title: 'There was an error updating the location',
          errors: 'User ID is required',
        },
      })
    }

    if ((location.lat && !location.lng) || (location.lng && !location.lat)) {
      return reject({
        statusCode: 400,
        status: 'error',
        data: {
          title: 'There was an error updating the location',
          errors: 'Supply both latitude and longitude values',
        },
      })
    }

    Location
      .findOneAndUpdate(
        { _id: locationId },
        setLocationFields(location),
        { new: true },
        (err, data) => {
          if (err) {
            reject({
              statusCode: 400,
              status: 'error',
              data: {
                title: 'There was an error updating the location',
              },
            })
          }

          resolve({
            statusCode: 200,
            status: 'success',
            data: {
              location: data,
            },
          })
        }
      )
  })
