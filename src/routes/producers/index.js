import { getProducers } from './get'
import createMongoDBService from '../../services/mongo-db'

const producersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/producers', getProducers(mongoDBService))
}

export default producersRoutesFactory
