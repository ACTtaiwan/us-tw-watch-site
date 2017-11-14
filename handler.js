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

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'application/x-font-ttf',
  'application/x-font-woff',
  'font/ttf',
  'font/woff',
  'font/woff2',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)
// const server = awsServerlessExpress.createServer(app)

const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.use('/api', require('./src/api'))

// assets/img/
// app.get(/^\/_nuxt\/img\/[\w-]+.(jpg|png)/, (req, res) => {
//   const url = req.url
//   const imgName = url.match(/[\w-]+.(jpg|png)/)[0]
//   res.sendFile(`${__dirname}/.nuxt/dist/img/${imgName}`)
// })

// static/*.(jpg/png)
// app.get(/^\/[\w-]+.(jpg|png)/, (req, res) => {
//   const url = req.url
//   const imgName = url.match(/[\w-]+.(jpg|png)/)[0]
//   res.sendFile(`${__dirname}/src/static/${imgName}`)
// })

// app.use(/^\/[\w-]+.(jpg|png)/, express.static(`${__dirname}/src/static`))
// app.all(/^\/[\w-]+.(jpg|png)/, (req, res) => {
//   const url = req.url
//   const imgName = url.match(/[\w-]+.(jpg|png|txt)/)[0]

//   res.redirect(`/static/${imgName}`)
// })
// app.use('/static/', express.static(`${__dirname}/src/static`))

app.use(awsServerlessExpressMiddleware.eventContext())
app.use(nuxt.render)

module.exports.main = (event, context) => {
  // workaround for double gzip encoding issue
  // HTTP gzip encoding should be done higher-up via something like CloudFront/CloudFlare
  // event.headers['Accept-Encoding'] = 'identity'

  console.log('proxying event=', event)

  awsServerlessExpress.proxy(server, event, context)
}
