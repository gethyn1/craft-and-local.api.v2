import { Producer, Category } from './register-models'
import { getProducers } from './producers'
import { getProducer } from './producer'
import { createProducer } from './create-producer'
import { updateProducer } from './update-producer'
import { updateProducerAvatar } from './update-producer-avatar'
import { getCategories } from './categories'

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
    }
  }
}

export default createMongoDBService
