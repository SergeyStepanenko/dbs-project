import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser
} from '../../db/users'
import { login, IUser } from '../resolvers'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Auth user',
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'The username'
    },
    password: {
      type: GraphQLString,
      description: 'The password'
    }
  })
})

const tokenType = new GraphQLObjectType({
  name: 'Token',
  description: 'JWT Token',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'JWT Token'
    }
  })
})

const query = {
  users: {
    type: new GraphQLList(userType),
    args: {
      limit: {
        description: 'limit items in the results',
        type: GraphQLInt
      }
    },
    resolve: (root, { limit }) => getUsers(limit)
  },
  userByUsername: {
    type: userType,
    args: {
      username: {
        description: 'find by username',
        type: GraphQLString
      }
    },
    resolve: (root, { username }) => getUserByUsername(username)
  }
}

const mutation = {
  addUser: {
    type: userType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (obj, input) => addUser(input)
  },
  login: {
    type: tokenType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (_, input: IUser) => {
      return login(input)
    }
  }
}

const subscription = {}

export const UserSchema = {
  query,
  mutation,
  subscription,
  types: [userType]
}
