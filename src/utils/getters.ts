import { Event, User, Activity } from '../models'

export async function getEventsById(eventIds: string[]) {
  try {
    const events = (await Event.find({ _id: { $in: eventIds } })) as any

    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: getUserById.bind(this, event.creator)
      }
    })
  } catch (error) {
    throw error
  }
}

export async function getSingleEventById(eventId: string) {
  try {
    const event = (await Event.findById(eventId)) as any

    return {
      ...event._doc,
      _id: event.id,
      activities: getActivitiesById.bind(this, event._doc.activityIdList),
      creator: getUserById.bind(this, event.creator)
    }
  } catch (error) {
    throw error
  }
}

export async function getUserById(userId: string) {
  try {
    const user = (await User.findById(userId)) as any

    return {
      ...user._doc,
      _id: user.id,
      createdEvents: getEventsById.bind(this, user._doc.createdEvents)
    }
  } catch (error) {
    throw error
  }
}

export async function getActivitiesById(activityIdList: string[]) {
  try {
    const activities = (await Activity.find({
      _id: { $in: activityIdList }
    })) as any

    return activities.map((activity) => {
      return {
        ...activity._doc,
        _id: activity.id
      }
    })
  } catch (error) {
    throw error
  }
}
