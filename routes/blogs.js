const router = require('express').Router()
const {auth} = require('./routeGuard')
const Post = require('../model/Post')
const multer  = require('multer')

//setting multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

//configuring multer upload engine
const upload = multer({storage: storage})

router.post('/', upload.single('postImage'), async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file.originalname
    })
    try {
        const blogPost = await post.save()
        res.send(blogPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router