import jwt from 'jsonwebtoken'
import { StrategyOptions, ExtractJwt } from 'passport-jwt'
import { getUserByUsername } from '../../db/users'

export interface IUser {
  username: string
  password: string
}

const JWT_SECRET_KEY = 'PRIVATE_AUTH_KEY'

interface JwtPayload {
  userId: string
}

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: JWT_SECRET_KEY,
  passReqToCallback: true
}

export async function login(input: IUser) {
  const { username, password } = input

  if (!username || !password) {
    throw new Error('Username or password not set in the request')
  }

  const user = await getUserByUsername(username)

  if (!user) {
    throw new Error(`User for "${username}" could not be found`)
  }

  if (!(await user.comparePassword(password))) {
    throw new Error('User password is not correct')
  }

  const jwtPayload: JwtPayload = {
    userId: user._id.toString()
  }

  // Return a sign token containing the user ID (JwtPayload)
  const token = jwt.sign(jwtPayload, jwtOptions.secretOrKey)

  return { token }
}
