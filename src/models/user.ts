import mongoose, { Schema } from 'mongoose'
import { ESchema } from '../constants'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: ESchema.Event
    }
  ]
})

export default mongoose.model(ESchema.User, userSchema)
