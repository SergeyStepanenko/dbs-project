export interface IEvent {
  title: string
  description: string
  price: number
  date: string
  userId: string
}

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IBooking {
  _id: string
  user: string
  event: string
  createdAt: string
  updatedAt: string
}
