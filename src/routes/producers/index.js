import { getProducers, getProducer } from './get'
import createMongoDBService from '../../services/mongo-db'

const producersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))
}

export default producersRoutesFactory
