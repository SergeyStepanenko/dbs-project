import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'

import graphQlSchema from './graphql/schema'
import graphQlResolver from './graphql/resolvers'
import { isAuth } from './middlewares/isAuth'
import { log } from './utils'

const app = express()
app.use(bodyParser.json())

app.use(isAuth)

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
    await mongoose.connect('mongodb://localhost/dbs-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(5000)

    log(
      `Connected to DB successfuly\n port: 5000 \n grapiQL: http://localhost:5000/graphql`
    )
  } catch (error) {
    log(`Error connection to DB: ${error}`)
  }
}

start()
