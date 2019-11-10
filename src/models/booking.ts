import mongoose, { Schema } from 'mongoose'
import { ESchema } from '../constants'

const bookingSchema = new Schema(
  {
    event: [
      {
        type: Schema.Types.ObjectId,
        ref: ESchema.Event
      }
    ],
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: ESchema.User
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model(ESchema.Booking, bookingSchema)
