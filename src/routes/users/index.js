import { authenticateUser, createUser } from './post'
import createMongoDBService from '../../services/mongo-db'

const usersRoutesFactory = (app, config) => {
  const mongoDBService = createMongoDBService(config)

  app.post('/users/authenticate', authenticateUser(mongoDBService))
  app.post('/users', createUser(mongoDBService))
}

export default usersRoutesFactory
