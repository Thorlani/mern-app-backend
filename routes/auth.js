const router = require('express').Router()
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    //Validate the user creation data   
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if user already exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('A user with this email already exists')

    //Check if username already exists
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists) return res.status(400).send('A user with this username already exists')

    //Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    } 
})

router.post('/login', async (req, res) => {
    //Validate the user before login
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if user exists
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(400).send('Username does not exist')

    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token)

    res.send("Logged In")
})


module.exports = router