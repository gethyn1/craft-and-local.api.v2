import { Producer, Category, Location } from './register-models'
import { getProducers } from './producers'
import { getProducer } from './producer'
import { createProducer } from './create-producer'
import { updateProducer } from './update-producer'
import { updateProducerAvatar } from './update-producer-avatar'
import { getCategories } from './categories'
import { getLocations } from './locations'

const createMongoDBService = () => {
  return {
    getProducers(query, limit) {
      return getProducers(Producer, query, limit)
    },
    getProducer(userId) {
      return getProducer(Producer, userId)
    },
    createProducer(producer) {
      return createProducer(Producer, producer)
    },
    updateProducer(userId, producer) {
      return updateProducer(Producer, userId, producer)
    },
    updateProducerAvatar(upload, file, userId) {
      return updateProducerAvatar(Producer, upload, file, userId)
    },
    getCategories() {
      return getCategories(Category)
    },
    getLocations(query, limit) {
      return getLocations(Location, query, limit)
    }
  }
}

export default createMongoDBService
