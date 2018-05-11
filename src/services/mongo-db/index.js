import { Producer } from './register-models'
import { getProducers } from './producers'
import { getProducer } from './producer'

const createMongoDBService = () => {
  return {
    getProducers(query, limit) {
      return getProducers(Producer, query, limit)
    },
    getProducer(userId) {
      return getProducer(Producer, userId)
    }
  }
}

export default createMongoDBService
