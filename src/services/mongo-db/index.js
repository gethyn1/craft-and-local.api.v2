import { Producer } from './register-models'
import { getProducers } from './producers'

const createMongoDBService = () => {
  return {
    getProducers(query, limit) {
      return getProducers(Producer, query, limit)
    }
  }
}

export default createMongoDBService
