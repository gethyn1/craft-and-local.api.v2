export const getProducer = (mongoDBService) => (req, res) => {
  mongoDBService.getProducer(req.params.userId)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
