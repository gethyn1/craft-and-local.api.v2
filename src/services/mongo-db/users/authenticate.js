export const authenticate = (User, jwtService, jwtSecret, email, password) =>
  new Promise((resolve, reject) => {
    User.findOne({ email })
      .exec((err, user) => {
        if (err) throw err

        if (!user) {
          return reject({
            statusCode: 401,
            status: 'error',
            data: {
              title: 'Authentication failed. User not found.',
            },
          })
        }

        user.comparePassword(password)
          .then((isMatch) => {
            if (!isMatch) {
              return reject({
                statusCode: 401,
                status: 'error',
                data: {
                  title: 'Authentication failed. Incorrect password.',
                },
              })
            }

            const token = jwtService.sign(user.toJSON(), jwtSecret, {
              expiresIn : 60 * 60 * 12, // expires in 12 hours
            })

            resolve({
              statusCode: 200,
              status: 'success',
              data: {
                token,
                isAdmin: user.roles.includes('admin'),
                email: user.email,
              },
            })
          })
          .catch((err) => {
            reject({
              statusCode: 401,
              status: 'error',
              data: {
                title: 'Authentication failed.',
                errors: err,
              },
            })
          })
      })
  })
