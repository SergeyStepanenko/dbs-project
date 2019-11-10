import mongoose, { Schema } from 'mongoose'
import { ESchema } from '../constants'

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: ESchema.User
  }
})

export default mongoose.model(ESchema.Event, eventSchema)
