import { Producer, Category, Location } from './register-models'

import {
  getProducers,
  getProducer,
  createProducer,
  updateProducer,
  updateProducerAvatar,
} from './producers'

import { getCategories } from './categories'
import { getLocations, getLocation } from './locations'

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
    },
    getLocation(_id) {
      return getLocation(Location, _id)
    }
  }
}

export default createMongoDBService
