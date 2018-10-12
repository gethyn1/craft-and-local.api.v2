export const createUser = (mongoDBService) => (req, res) => {
  mongoDBService.createUser(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
