import { setProducerFields } from './set-producer-fields'

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
