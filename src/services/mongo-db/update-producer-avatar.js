export const updateProducerAvatar = (Producer, upload, file, userId) =>
  new Promise((resolve, reject) => {
    if (typeof file === 'undefined') {
      return reject({
        statusCode: 400,
        status: 'bad request',
        data: {
          title: 'A valid file is required',
        }
      })
    }

    // Find producer by userId
    Producer.findOne({ user_id: userId }, (err, producer) => {
      if (err) {
        return reject({
          statusCode: 400,
          status: 'Bad request',
          data: {
            title: err,
          },
        })
      }

      if (!producer) {
        return reject({
          statusCode: 404,
          status: 'not found',
          data: {
            title: 'No producer found with requested ID',
          },
        })
      }

      // If field already has a value then delete current image
      // const currentFile = producer[file.fieldname]
      //
      // if (currentFile) {
      //   deleteImage(currentFile)
      // }

      // Update doc with new image path
      producer[file.fieldname] = upload.data.url

      producer.save((err) => {
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
            url: upload.data.url,
          },
        })
      })
    })
  })
