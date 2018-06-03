export const getProducer = (Producer, user_id) =>
  new Promise((resolve, reject) => {
    Producer
      .findOne({ user_id })
      .populate('categories')
      .populate('locality')
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
              title: 'No producer found with requested ID',
            },
          })
        }

        resolve({
          statusCode: 200,
          status: 'success',
          data: {
            producer: results,
          },
        })
      })
  })
