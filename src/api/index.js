const express = require('express')
const Router = express.Router
const router = Router()

var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.use('/hello-world', require('./hello-world'))
router.use('/login', require('./login'))
router.use('/logout', require('./logout'))

module.exports = router
