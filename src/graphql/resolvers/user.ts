import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../models'
import { transformUser } from '../../utils/transformers'
import { IUser } from '../../types'

async function users() {
  try {
    const users = await User.find()

    return users.map(transformUser)
  } catch (error) {
    throw error
  }
}

async function createUser(args: { userInput: IUser }) {
  const {
    userInput: { name, email, password }
  } = args

  try {
    const user = await User.findOne({ email })

    if (user) {
      throw new Error(`User with email: ${email} exists already.`)
    }
  } catch (error) {
    throw error
  }
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: hashedPassword
  })

  try {
    const result = (await user.save()) as any

    return { ...result._doc, _id: result.id }
  } catch (error) {
    throw error
  }
}

async function login({ email, password }) {
  const user = (await User.findOne({ email })) as any

  if (!user) {
    throw new Error(`Invalid credentials.`)
  }

  const isEqual = bcrypt.compare(password, user.password)

  if (!isEqual) {
    throw new Error(`Invalid credentials.`)
  }

  const userId = user.id

  const token = jwt.sign({ userId, email: user.email }, 'secretKey', {
    expiresIn: '1h'
  })

  return { userId, token, tokenExpiration: 1 }
}

export default { users, createUser, login }
