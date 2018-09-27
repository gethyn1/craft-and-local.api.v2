export const updateField = (Producer, file, userId) =>
  new Promise((resolve, reject) => {
    // Upload the image
    uploadImage(file)
      .then((data) => {
        // Find producer by userId
        Producer.findOne({ user_id: userId }, (err, producer) => {
          if(err) {
            reject({
              status: 'error',
              data: {
                title: err,
              }
            })
          }

          // If field already has a value then delete current image
          const currentFile = producer[file.fieldname]

          if (currentFile) {
            deleteImage(currentFile)
          }

          // Update doc with new image path
          producer[file.fieldname] = data.data.url

          producer.save((err) => {
            if (err) {
              reject({
                status: 'error',
                data: {
                  title: err,
                }
              })
            }

            // Return data
            resolve({
              status: 'success',
              data: {
                url: data.data.url,
              },
            })
          })
        })
      })
      .catch(err => reject(err))
  })
