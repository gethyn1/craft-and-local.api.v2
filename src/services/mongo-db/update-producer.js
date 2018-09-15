import { setProducerFields } from './set-producer-fields'

export const updateProducer = (Producer, user_id, producer) =>
  new Promise((resolve, reject) => {
    console.log(user_id, producer)
    if (!user_id || user_id === 'undefined') {
      return reject({
        statusCode: 400,
        status: 'error',
        data: {
          title: 'There was an error updating the producer',
          errors: 'User ID is required',
        },
      })
    }

    if ((producer.lat && !producer.lng) || (producer.lng && !producer.lat)) {
      return reject({
        statusCode: 400,
        status: 'error',
        data: {
          title: 'There was an error updating the producer',
          errors: 'Supply both latitude and longitude values',
        },
      })
    }

    Producer
      .findOneAndUpdate(
        { user_id },
        setProducerFields(producer),
        { new: true },
        (err, data) => {
          if (err) {
            reject({
              statusCode: 400,
              status: 'error',
              data: {
                title: 'There was an error updating the producer',
              },
            })
          }

          resolve({
            statusCode: 200,
            status: 'success',
            data: {
              producer: data,
            },
          })
        }
      )
  })
