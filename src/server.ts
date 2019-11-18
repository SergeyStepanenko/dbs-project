import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'

import graphQlSchema from './graphql/schema'
import graphQlResolver from './graphql/resolvers'
import { log } from './utils'

const app = express()
app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
  })
)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@dbs-cluster-b1vuv.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    app.listen(5000)

    log('Connected to DB successfuly')
  } catch (error) {
    log(`Error connection to DB: ${error}`)
  }
}

start()
