import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { printSchema } from 'graphql'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import graphQlSchema from './graphql/schema'
import setupImageUpload from './rest/setupImageUpload'
import { setupPassportAuth, onlyAuthorized } from './authenticate'
import graphqlSchema from './graphql/schema'
;(mongoose as any).Promise = global.Promise

const app = express()

const DEBUG_MODE = true

// Express morgan logs
// app.use(morgan("combined"));

// Parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

setupPassportAuth(app, DEBUG_MODE)

app.use(
  '/graphql',
  cors(),
  graphqlHttp({
    schema: graphQlSchema,
    graphiql: true
  })
)

if (!DEBUG_MODE) {
  app.use(onlyAuthorized())
}

app.use('/schema', onlyAuthorized(), (req, res, _next) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(graphqlSchema))
})

app.use(fileUpload({ createParentPath: true }))
setupImageUpload(app)

async function start() {
  try {
    await mongoose.connect('mongodb://localhost/dbs-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(5000)

    console.log(
      `Connected to DB successfuly\nport: 5000\ngrapiQL: http://localhost:5000/graphql`
    )
  } catch (error) {
    console.log(`Error connection to DB: ${error}`)
  }
}

start()
