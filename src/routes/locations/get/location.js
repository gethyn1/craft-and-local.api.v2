export const getLocation = (mongoDBService) => (req, res) => {
  mongoDBService.getLocation(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
