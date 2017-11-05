const Router = require('express').Router
const router = Router()

// Add POST - /api/logout
router.post('/', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

module.exports = router
