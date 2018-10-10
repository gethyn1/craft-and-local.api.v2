import mongoose, { Schema } from 'mongoose'

const LocationSchema = Schema({
  producer: { type: Schema.Types.ObjectId, ref: 'Producer' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      min: [2, 'Coordinates must contain 2 points'],
      max: [2, 'Coordinates must contain 2 points'],
      default: [0, 0],
    }
  },
  address: {
    type: String,
  },
  instagram_handle: {
    type: String,
    default: '',
  },
  twitter_handle: {
    type: String,
    default: '',
  },
  contact_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  contact_telephone: {
    type: String,
  },
  alias: {
    type: String,
  },
})

export default mongoose.model('Location', LocationSchema)
