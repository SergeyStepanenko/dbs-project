import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
    activities: [Activity]!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type Activity {
    _id: ID!
    name: String!
    description: String!
    events: [Event]!
  }

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
    userId: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input BookingInput {
    userId: ID!
    eventId: ID!
  }

  type RootQuery {
    users: [User!]!
    events: [Event!]!
    activities: [Activity!]!
    bookings: [Booking!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(bookingInput: BookingInput): Booking
    cancelBooking(bookingInput: BookingInput): Event
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

export default schema
