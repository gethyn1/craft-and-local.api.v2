export const getProducer = (Producer, user_id) =>
  new Promise((resolve, reject) => {
    Producer
      .findOne({ user_id })
      .populate('categories')
      .populate('locality')
      .exec((err, results) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        if (!results) {
          reject({
            statusCode: 404,
            data: {
              status: 'error',
              data: {
                title: 'No producer found with requested ID',
              },
            }
          })
        }

        resolve({
          status: 'success',
          data: {
            producer: results,
          },
        })
      })
  })
