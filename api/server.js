const express = require('express')

const LoginRouter = require('../login/login-router')

const server = express()

server.use(express.json())
server.use('/login', LoginRouter)


module.exports = server

