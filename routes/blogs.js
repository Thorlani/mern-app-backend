const router = require('express').Router()
const Post = require('../model/Post')
const upload = require('../utils/multer')
const {cloudinary} = require('../utils/cloudinary')


router.post('/', upload.single("postImage"),async (req, res) => { 

    const result = await  cloudinary.uploader.upload(req.file.path)

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: result.secure_url
    })
    try {
        const blogPost = await post.save()
        res.send(blogPost)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router