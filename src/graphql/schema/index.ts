import { GraphQLSchema, GraphQLObjectType } from 'graphql'

// Import each models schema
import { UserSchema } from './user'
import { ProductSchema } from './product'

const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => Object.assign(UserSchema.query, ProductSchema.query)
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => Object.assign(UserSchema.mutation, ProductSchema.mutation)
  }),
  types: [...ProductSchema.types, ...UserSchema.types]
})

export default graphqlSchema
