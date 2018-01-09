/*
 * Handler definition for https://serverless.com/
 */
// const Nuxt = require('nuxt')
const { Nuxt } = require('nuxt')
// const express = require('express')

let nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = false
const nuxt = new Nuxt(nuxtConfig)

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const awsServerlessExpress = require('aws-serverless-express')
const app = require('express')()
const appConfig = require('./config/app.json')

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const server = awsServerlessExpress.createServer(app, null, appConfig.binaryMimeTypes)
// const server = awsServerlessExpress.createServer(app)

const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)

app.use(awsServerlessExpressMiddleware.eventContext())
app.use(nuxt.render)

module.exports.main = (event, context) => {
  // workaround for double gzip encoding issue
  // HTTP gzip encoding should be done higher-up via something like CloudFront/CloudFlare
  // event.headers['Accept-Encoding'] = 'identity'

  console.log('proxying event=', event)

  awsServerlessExpress.proxy(server, event, context)
}
