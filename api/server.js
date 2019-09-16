const express = require('express')
const cors = require('cors')

const LoginRouter = require('../login/login-router')

const server = express()

server.use(express.json())
server.use(cors())
server.use('/login', LoginRouter)


server.get('/', (req, res) => {
    res.send('Sanity check')
})


module.exports = server

