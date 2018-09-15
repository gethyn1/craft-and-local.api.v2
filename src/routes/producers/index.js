import { getProducers, getProducer } from './get'
import { createProducer, updateProducer } from './post'
import createMongoDBService from '../../services/mongo-db'

const producersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))
  app.post('/producers', createProducer(mongoDBService))
  app.post('/producers/:userId', updateProducer(mongoDBService))
}

export default producersRoutesFactory
