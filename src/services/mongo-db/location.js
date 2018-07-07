export const getLocation = (Location, id) =>
  new Promise((resolve, reject) => {
    Location
      .findById(id)
      .populate('categories')
      .populate('producer')
      .exec((err, results) => {
        if (err) {
          reject({
            statusCode: 400,
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        if (!results) {
          reject({
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
            location: results,
          },
        })
      })
  })
