import { IS_PROD } from '../../config'
import { getLocations, getLocation } from './get'
import { createLocation, updateLocation } from './post'
import createMongoDBService from '../../services/mongo-db'

const locationsRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))

  if (!IS_PROD) {
    app.post('/locations', createLocation(mongoDBService))
    app.post('/locations/:locationId', updateLocation(mongoDBService))
  }
}

export default locationsRoutesFactory
