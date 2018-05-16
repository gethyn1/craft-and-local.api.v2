import { getCategories } from './get'
import createMongoDBService from '../../services/mongo-db'

const categoryRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/categories', getCategories(mongoDBService))
}

export default categoryRoutesFactory
