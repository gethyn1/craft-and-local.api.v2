export const createLocation = (mongoDBService) => (req, res) => {
  mongoDBService.createLocation(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}

export const updateLocation = (mongoDBService) => (req, res) => {
  mongoDBService.updateLocation(req.params.locationId, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
