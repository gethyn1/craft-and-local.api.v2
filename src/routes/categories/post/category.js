export const createCategory = (mongoDBService) => (req, res) => {
  mongoDBService.createCategory(req.body.title, req.body.slug)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
