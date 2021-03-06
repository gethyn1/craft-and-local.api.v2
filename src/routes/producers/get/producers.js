import { PRODUCER_LIMIT, MAX_PRODUCER_LIMIT } from './constants'

export const getProducers = (mongoDBService) => (req, res) => {
  mongoDBService.getProducers(req.query, PRODUCER_LIMIT, MAX_PRODUCER_LIMIT)
    .then(data => res.json(data))
    .catch(err => res.status(err.statusCode).send(err))
}
