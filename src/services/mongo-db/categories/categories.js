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

export const createCategory = (Category, title, slug) =>
  new Promise((resolve, reject) => {
    const newCategory = new Category({
      title,
      slug: slug.toLowerCase(),
    })

    newCategory.save((err, data) => {
      if (err) {
        return reject({
          statusCode: 500,
          status: 'error',
          data: {
            title: 'There was an error creating the category',
            errors: err.errors || err.message,
          },
        })
      }

      return resolve({
        statusCode: 200,
        status: 'success',
        data: {
          category: data,
        },
      })
    })
  })

