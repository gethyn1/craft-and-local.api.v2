export const getCategories = (Category) =>
  new Promise((resolve, reject) => {
    Category
      .find({})
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

        resolve({
          statusCode: 200,
          status: 'success',
          data: {
            categories: results,
          },
        })
      })
  })
