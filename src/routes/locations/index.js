import { IS_PROD } from '../../config'
import { getLocations, getLocation } from './get'
import { createLocation, updateLocation } from './post'
import createMongoDBService from '../../services/mongo-db'
import { authentication } from '../middleware'

const { authenticateJSONWebToken, authenticateAsAdmin } = authentication

const locationsRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.get('/locations', getLocations(mongoDBService))
  app.get('/locations/:id', getLocation(mongoDBService))

  app.post(
    '/locations',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    createLocation(mongoDBService)
  )
  app.post(
    '/locations/:locationId',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    updateLocation(mongoDBService)
  )
}

export default locationsRoutesFactory
