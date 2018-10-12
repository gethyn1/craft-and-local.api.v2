export const create = (User, user) =>
  new Promise((resolve, reject) => {
    const newUser = new User(user)

    newUser.save((err, data) => {
      if (err) {
        return reject({
          statusCode: 500,
          status: 'error',
          data: {
            title: 'There was an error creating the user',
            errors: err.errors || err.message,
          },
        })
      }

      return resolve({
        statusCode: 200,
        status: 'success',
        data: {
          user: data,
        },
      })
    })
  })
