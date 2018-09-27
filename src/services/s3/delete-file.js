export const deleteFile = (client, key) =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
    }

    client.deleteObject(params, (err, data) => {
      if (err) {
        reject({
          statusCode: 400,
          status: 'Bad request',
          data: {
            title: err,
          }
        })
      }

      resolve({
        statusCode: 200,
        status: 'success',
        data: {
          title: 'File succesfully deleted',
        },
      })
    })
  })
