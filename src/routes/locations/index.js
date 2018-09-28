import { getLocations, getLocation } from './get'
import createMongoDBService from '../../services/mongo-db'

const locationsRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))
}

export default locationsRoutesFactory
