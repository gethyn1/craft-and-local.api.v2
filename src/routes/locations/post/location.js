export const createLocation = (mongoDBService) => (req, res) => {
  mongoDBService.createLocation(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
