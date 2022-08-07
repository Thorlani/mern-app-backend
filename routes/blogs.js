const router = require('express').Router()
const {auth} = require('./routeGuard')
const Post = require('../model/Post')
const  fs = require('fs')

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: "image/png "
        }
    })
    try {
        const blogPost = await post.save()
        res.send(blogPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router