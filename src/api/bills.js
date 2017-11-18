const Router = require('express').Router
const router = Router()

const bills = require('./fake-bills.json')

router.get('/', function (req, res, next) {
  res.json(bills)
})

module.exports = router
