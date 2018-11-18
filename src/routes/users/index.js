import { authenticateUser, createUser } from './post'
import createMongoDBService from '../../services/mongo-db'
import { authentication } from '../middleware'

const { authenticateJSONWebToken, authenticateAsAdmin } = authentication

const usersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.post(
    '/users/authenticate',
    authenticateUser(mongoDBService)
  )

  app.post(
    '/users',
    authenticateJSONWebToken,
    authenticateAsAdmin,
    createUser(mongoDBService)
  )
}

export default usersRoutesFactory
