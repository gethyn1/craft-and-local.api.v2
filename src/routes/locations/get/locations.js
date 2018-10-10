import { LOCATION_LIMIT, MAX_LOCATION_LIMIT } from './constants'

export const getLocations = (mongoDBService) => (req, res) => {
  mongoDBService.getLocations(req.query, LOCATION_LIMIT, MAX_LOCATION_LIMIT)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
