import { Event, User, Activity, Booking } from '../../models'
import {
  getUserById,
  getEventsById,
  getSingleEventById,
  getActivitiesById
} from '../../utils'
import { IEvent, IUser, IBooking } from '../../types'
import { TEMP_USER_ID } from '../../constants'

const resolver = {
  events: async () => {
    try {
      const events = await Event.find()

      return events.map((event: any) => ({
        ...event._doc,
        _id: event.id,
        creator: getUserById.bind(this, event._doc.creator),
        activities: getActivitiesById.bind(this, event._doc.activityIdList)
      }))
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
  users: async () => {
    try {
      const users = await User.find()

      return users.map((user: any) => ({
        ...user._doc,
        _id: user.id,
        createdEvents: getEventsById.bind(this, user._doc.createdEvents)
      }))
    } catch (error) {
      throw error
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find()

      return bookings.map((booking: any) => ({
        ...booking._doc,
        _id: booking.id,
        user: getUserById.bind(this, booking._doc.user),
        event: getSingleEventById.bind(this, booking._doc.event),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
      }))
    } catch (error) {
      throw error
    }
  },
  createEvent: async (args: { eventInput: IEvent }) => {
    const {
      eventInput: { title, description, price, date }
    } = args

    const event = new Event({
      title,
      description,
      price,
      date,
      creator: TEMP_USER_ID
    })

    try {
      const user = (await User.findById(TEMP_USER_ID)) as any

      if (!user) {
        throw new Error(`User not found.`)
      }

      const result = (await event.save()) as any
      user.createdEvents.push(result)
      user.save()

      const createdEvent = {
        ...result._doc,
        _id: result.id,
        creator: getUserById.bind(this, result._doc.creator)
      }

      return createdEvent
    } catch (error) {
      throw error
    }
  },
  createUser: async (args: { userInput: IUser }) => {
    const {
      userInput: { email, password }
    } = args

    try {
      const user = await User.findOne({ email })

      if (user) {
        throw new Error(`User with email: ${email} exists already.`)
      }
    } catch (error) {
      throw error
    }

    const user = new User({
      email,
      password
    })

    try {
      const result = (await user.save()) as any

      return { ...result._doc, _id: result.id }
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
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString()
    }
  }
}

export default resolver
