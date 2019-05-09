require('dotenv').config({ path: './express-server/.env' })
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// init Application Insights (Azure telemetry)
if (isProd) {
  const appInsights = require('applicationinsights')
  appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false);
  const role = `ustw-site-${process.env.STAGE || 'dev'}`
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = role
  appInsights.start();
  console.log(`NODE_ENV = production. Use Application Insights. Key = ${process.env.APPINSIGHTS_INSTRUMENTATIONKEY} Role = ${role}`);
} else {
  console.log('NODE_ENV = dev. Not use Application Insights.');
}

// We instantiate Nuxt.js with the options
const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  console.log('Dev mode')
  new Builder(nuxt).build().then(listen)
} else {
  console.log('Prod mode')
  listen()
}

function listen() {
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
