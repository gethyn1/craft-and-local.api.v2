const setProducerFields = (producer) => {
  let updatedFields = {}

  Object.keys(producer).forEach((key) => {
    switch (key) {
      case 'lat':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[1] = producer[key]
        break
      case 'lng':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[0] = producer[key]
        break
      default:
        updatedFields[key] = producer[key]
        break
    }
  })

  return updatedFields
}

export const createProducer = (Producer, producer) =>
  new Promise((resolve, reject) => {
    const newProducer = new Producer(setProducerFields(producer))

    newProducer.save((err, producer) => {
      if (err) {
        reject({
          statusCode: 400,
          status: 'error',
          data: {
            title: 'There was an error creating the producer',
            errors: err.errors,
          },
        })
      }

      resolve({
        statusCode: 200,
        status: 'success',
        data: {
          producer,
        },
      })
    })
  })
