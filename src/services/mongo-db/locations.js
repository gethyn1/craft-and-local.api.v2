export const getLocations = (Location, query, limit = 30, maxLimit = 50) =>
  new Promise((resolve, reject) => {
    let numberOfLocationsToGet = limit < maxLimit ? limit : maxLimit

    // Create an empty filters object for querying the database.
    const filters = {}

    if (query.hasOwnProperty('limit')) {
      // Set a min distance to query from.
      const queryLimit = parseInt(query.limit, 10)
      numberOfLocationsToGet = queryLimit < maxLimit ? queryLimit : maxLimit
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

    if (query.hasOwnProperty('categories')) {
      // Find producers in category.
      filters.categories = query.categories
    }

    Location
      .find(filters)
      .limit(numberOfLocationsToGet)
      .populate('categories')
      .populate('producer')
      .exec((err, results) => {
        if (err) {
          reject({
            statusCode: 400,
            status: 'bad request',
            data: {
              title: err,
            },
          })
        }

        resolve({
          statusCode: 200,
          status: 'success',
          data: {
            locations: results,
          },
        })
      })
  })
