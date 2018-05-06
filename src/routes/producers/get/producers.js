import { PRODUCER_LIMIT } from './constants'

export const getProducers = (mongoDBService) => (req, res) => {
  mongoDBService.getProducers(req.query, PRODUCER_LIMIT)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err))
}
