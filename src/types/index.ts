export interface IEvent {
  title: string
  description: string
  price: number
  date: string
}

export interface IUser {
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
