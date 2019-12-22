import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import graphQlSchema from './graphql/schema'
import graphQlResolver from './graphql/resolvers'
import imageUploadMethod from './rest/imageUpload'
import { isAuth } from './middlewares/isAuth'
import { log } from './utils'

const app = express()

app.use(
  '/graphql',
  bodyParser.json(),
  isAuth,
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
  })
)

app.use(fileUpload({ createParentPath: true }))

imageUploadMethod(app)

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
