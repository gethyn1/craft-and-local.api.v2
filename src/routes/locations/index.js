import { getLocations } from './get'
import createMongoDBService from '../../services/mongo-db'

const locationsRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/locations', getLocations(mongoDBService))
}

export default locationsRoutesFactory
