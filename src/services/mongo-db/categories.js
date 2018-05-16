export const getCategories = (Category) =>
  new Promise((resolve, reject) => {
    Category
      .find({})
      .exec((err, results) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        resolve({
          status: 'success',
          data: {
            categories: results,
          },
        })
      })
  })
