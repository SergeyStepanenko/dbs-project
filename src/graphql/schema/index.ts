import { buildSchema } from 'graphql'
import { ESchema, EInputs } from '../../constants'

const schema = buildSchema(`
  type ${ESchema.Event} {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: ${ESchema.User}!
    activities: [${ESchema.Activity}]!
  }

  type ${ESchema.User} {
    _id: ID!
    email: String!
    password: String
    createdEvents: [${ESchema.Event}!]
  }

  type ${ESchema.Activity} {
    _id: ID!
    name: String!
    description: String!
    events: [${ESchema.Event}]!
  }

  type ${ESchema.Booking} {
    _id: ID!
    event: ${ESchema.Event}!
    user: ${ESchema.User}!
    createdAt: String!
    updatedAt: String!
  }

  input ${EInputs.EventInput} {
    title: String!
    description: String!
    price: Float!
    date: String!
    userId: String!
  }

  input ${EInputs.UserInput} {
    email: String!
    password: String!
  }

  input ${EInputs.BookingInput} {
    userId: ID!
    eventId: ID!
  }

  type RootQuery {
    users: [${ESchema.User}!]!
    events: [${ESchema.Event}!]!
    activities: [${ESchema.Activity}!]!
    bookings: [${ESchema.Booking}!]!
  }

  type RootMutation {
    createEvent(eventInput: ${EInputs.EventInput}): ${ESchema.Event}
    createUser(userInput: ${EInputs.UserInput}): ${ESchema.User}
    bookEvent(bookingInput: ${EInputs.BookingInput}): ${ESchema.Booking}
    cancelBooking(bookingInput: ${EInputs.BookingInput}): ${ESchema.Event}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

export default schema
