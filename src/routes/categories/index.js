import { getCategories } from './get'
import { createCategory } from './post'
import createMongoDBService from '../../services/mongo-db'
import { authentication } from '../middleware'

const { authenticateJSONWebToken, authenticateAsAdmin } = authentication

const categoryRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/categories', getCategories(mongoDBService))

  app.post(
    '/categories',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    createCategory(mongoDBService)
  )
}

export default categoryRoutesFactory
