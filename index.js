const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser')
const cors = require('cors')

//middleware
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/blogs')

const uri = process.env.DB_CONNECTION


mongoose.connect( uri, { useNewUrlParser: true }, () => console.log('connected to db'))

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/blog', postRoute)

app.get('/', (req, res) => {
    res.send("Blog Project")
})

app.listen(3001, () => {
    console.log('Server is up and running');
})