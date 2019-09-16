const express = require('express')

const LoginRouter = require('../login/login-router')

const server = express()

server.use(express.json())
server.use('/login', LoginRouter)

server.get('/', (req, res) => {
    res.send('Sanity check')
})


module.exports = server

