import { IS_PROD } from '../../config'
import { getProducers, getProducer } from './get'
import { createProducer, updateProducer } from './post'
import createMongoDBService from '../../services/mongo-db'
import { authentication } from '../middleware'

const { authenticateJSONWebToken, authenticateAsAdmin } = authentication

const producersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/producers', getProducers(mongoDBService))
  app.get('/producers/:userId', getProducer(mongoDBService))

  app.post(
    '/producers',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    createProducer(mongoDBService)
  )
  app.post(
    '/producers/:userId',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    updateProducer(mongoDBService)
  )
}

export default producersRoutesFactory
