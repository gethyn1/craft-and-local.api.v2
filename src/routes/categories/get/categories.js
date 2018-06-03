export const getCategories = (mongoDBService) => (req, res) => {
  mongoDBService.getCategories()
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
