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
    name: String!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Int!
    images: [String!]!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    userId: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input BookingInput {
    userId: ID!
    eventId: ID!
  }

  input ProductInput {
    title: String!
    description: String!
    price: Int!
    images: [String!]!
  }

  type RootQuery {
    users: [User!]!
    events: [Event!]!
    activities: [Activity!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    products: [Product!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(bookingInput: BookingInput): Booking
    cancelBooking(bookingInput: BookingInput): Event
    productCreate(productInput: ProductInput): Product
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

export default schema
