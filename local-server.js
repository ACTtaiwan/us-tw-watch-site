const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const express = require('express')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.POST || 3000
const app = express()

process.env.HOST = HOST
process.env.PORT = PORT

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

app.use('/api', require('./src/api'))

let nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = process.env.NODE_ENV !== 'production'

const nuxt = new Nuxt(nuxtConfig)
app.use(nuxt.render)

// app.all(/^\/[\w-]+.(jpg|png)/, (req, res) => {
//   const url = req.url
//   const imgName = url.match(/[\w-]+.(jpg|png|txt)/)[0]

//   res.redirect(`/static/${imgName}`)
// })
// app.use('/static/', express.static(`${__dirname}/src/static`))

if (nuxtConfig.dev) {
  // nuxt.build()
  const builder = new Builder(nuxt)
  builder.build().catch(error => {
    console.error(error)
    process.exit(1)
  })
}

app.listen(PORT, HOST)
console.log(`Server listening on ${HOST}:${PORT}`)
