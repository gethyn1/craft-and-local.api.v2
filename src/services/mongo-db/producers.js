export const getProducers = (Producer, query, limit = 30, maxLimit = 50) =>
  new Promise((resolve, reject) => {
    let numberOfProducersToGet = limit < maxLimit ? limit : maxLimit

    // Create an empty filters object for querying the database.
    const filters = {}

    if (query.hasOwnProperty('limit')) {
      // Set a min distance to query from.
      const queryLimit = parseInt(query.limit, 10)
      numberOfProducersToGet = queryLimit < maxLimit ? queryLimit : maxLimit
    }

    if (query.hasOwnProperty('latlng')) {
      // Filter results by location (nearest to furthest).
      const latLngArr = query.latlng.split(',')
      const lat = latLngArr[0]
      const lng = latLngArr[1]

      filters.location = {
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
        }
      }

      if (query.hasOwnProperty('mindistance')) {
        // Set a min distance to query from.
        filters.location.$near.$minDistance = query.mindistance
      }
    }

    if (query.hasOwnProperty('exclude')) {
      // Exclude producers by id.
      filters._id = {
        $nin: query.exclude.split(',')
      }
    }

    if (query.hasOwnProperty('categories_like')) {
      // Find producers in category.
      filters.categories = query.categories_like
    }

    Producer
      .find(filters)
      .limit(numberOfProducersToGet)
      .populate('categories')
      .exec((err, results) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        resolve({
          status: 'success',
          data: {
            producers: results,
          },
        })
      })
  })
