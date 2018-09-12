export const createProducer = (mongoDBService) => (req, res) => {
  mongoDBService.createProducer(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
