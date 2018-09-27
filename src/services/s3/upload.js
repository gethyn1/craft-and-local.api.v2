const timestampedID = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

const getFileExtension = (fileName) =>
  fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)

const generateUniqueFileName = (fileName) =>
  `${timestampedID()}.${getFileExtension(fileName)}`

export const upload = (client, file) =>
  new Promise((resolve, reject) => {
    if (typeof file === 'undefined') {
      return reject({
        statusCode: 400,
        status: 'Bad request',
        data: {
          title: 'A valid file is required',
        }
      })
    }

    const uniqueFileName = generateUniqueFileName(file.originalname)

    const params = {
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength : file.size,
      ACL: 'public-read'
    }

    client.putObject(params, (err, data) => {
        if (err) {
          reject({
            statusCode: 400,
            status: 'Server error',
            data: {
              title: err,
            }
          })
        }

        resolve({
          statusCode: 200,
          status: 'success',
          data: {
            url: uniqueFileName,
          },
        })
      }
    )
  })
