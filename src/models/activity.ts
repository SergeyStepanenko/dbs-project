import mongoose, { Schema } from 'mongoose'
import { ESchema } from '../constants'

const activitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  }
})

export default mongoose.model(ESchema.Activity, activitySchema)
