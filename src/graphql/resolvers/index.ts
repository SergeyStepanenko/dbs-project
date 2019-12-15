import { Request } from 'express'
import { Event, User, Activity, Booking } from '../../models'
import { getUserById, getSingleEventById } from '../../utils'
import { transformEvent } from '../../utils/transformers'
import dateToIsoString from '../../utils/dateToIsoString'
import userResolver from './user'
import { IEvent } from '../../types'

const resolver = {
  ...userResolver,
  events: async () => {
    try {
      const events = await Event.find()

      return events.map(transformEvent)
    } catch (error) {
      throw error
    }
  },
  activities: async () => {
    try {
      const activities = await Activity.find()

      return activities.map((event: any) => ({
        ...event._doc,
        _id: event.id
      }))
    } catch (error) {
      throw error
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find()

      return bookings.map((booking: any) => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: getUserById.bind(this, booking._doc.user),
          event: getSingleEventById.bind(this, booking._doc.event),
          createdAt: dateToIsoString(booking._doc.createdAt),
          updatedAt: dateToIsoString(booking._doc.updatedAt)
        }
      })
    } catch (error) {
      throw error
    }
  },
  createEvent: async (args: { eventInput: IEvent }, req: Request) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!')
    // }

    const {
      eventInput: { title, description, price, date, userId }
    } = args

    const event = new Event({
      title,
      description,
      price,
      date,
      creator: userId
    })

    try {
      const user = (await User.findById(userId)) as any

      if (!user) {
        throw new Error(`User not found.`)
      }

      const result = (await event.save()) as any
      user.createdEvents.push(result)
      user.save()

      return transformEvent(result)
    } catch (error) {
      throw error
    }
  },
  bookEvent: async (args) => {
    const {
      bookingInput: { eventId, userId }
    } = args

    const fetchedUser = await User.findById(userId)
    const fetchedEvent = await Event.findById(eventId)

    const booking = new Booking({
      user: fetchedUser,
      event: fetchedEvent
    })

    const result = (await booking.save()) as any

    return {
      ...result._doc,
      _id: result.id,
      createdAt: dateToIsoString(result._doc.createdAt),
      updatedAt: dateToIsoString(result._doc.updatedAt)
    }
  },
  cancelBooking: async (args) => {
    const { bookingId } = args

    try {
      const booking = (await Booking.findById(bookingId).populate(
        'event'
      )) as any

      const event = transformEvent(booking.event)

      await Booking.deleteOne({ _id: bookingId })

      return event
    } catch (error) {}
  }
}

export default resolver
