export const authenticateUser = (mongoDBService) => (req, res) => {
  mongoDBService.authenticateUser(
    req.app.get('jwtTokenSecret'),
    req.body.email,
    req.body.password
  )
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}

export const createUser = (mongoDBService) => (req, res) => {
  mongoDBService.createUser(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
