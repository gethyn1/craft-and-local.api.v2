import mongoose, { Schema } from 'mongoose'

const CategorySchema = Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  slug: {
    type: String,
    required: 'Slug is required',
    unique: true,
  },
})

export default mongoose.model('Category', CategorySchema)
