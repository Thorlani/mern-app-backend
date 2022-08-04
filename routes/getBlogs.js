const router = require('express').Router()
const Post = require('../model/Post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router