const router = require('express').Router()
const {auth} = require('./routeGuard')

router.get('/', auth, (req, res) => {
    res.json({message: 'You are logged in'})
})

module.exports = router