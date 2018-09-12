import { Producer, Category } from './register-models'
import { getProducers } from './producers'
import { getProducer } from './producer'
import { createProducer } from './create-producer'
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
    getCategories() {
      return getCategories(Category)
    }
  }
}

export default createMongoDBService
