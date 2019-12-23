import { getUserById, getActivitiesById, getEventsById } from './getters'

export function transformEvent(event) {
  return {
    ...event._doc,
    _id: event.id,
    creator: getUserById.bind(this, event._doc.creator),
    activities: getActivitiesById.bind(this, event._doc.activityIdList)
  }
}

export function transformUser(user) {
  return {
    ...user._doc,
    _id: user.id,
    createdEvents: getEventsById.bind(this, user._doc.createdEvents)
  }
}

export function transformProduct(product) {
  return {
    ...product._doc,
    id: product.id
  }
}
