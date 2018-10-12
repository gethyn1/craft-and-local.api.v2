import { Producer, Category, Location, User } from './register-models'

import {
  getProducers,
  getProducer,
  createProducer,
  updateProducer,
  updateProducerAvatar,
} from './producers'

import { getCategories } from './categories'
import * as locations from './locations'
import * as users from './users'

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
      return locations.getLocations(Location, query, limit)
    },
    getLocation(_id) {
      return locations.getLocation(Location, _id)
    },
    createLocation(location) {
      return locations.create(Location, location)
    },
    updateLocation(locationId, location) {
      return locations.update(Location, locationId, location)
    },
    createUser(user) {
      return users.create(User, user)
    },
  }
}

export default createMongoDBService
