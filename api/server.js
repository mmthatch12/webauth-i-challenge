const express = require('express')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const LoginRouter = require('../login/login-router')
const dbConnection = require('../data/db.config')

const server = express()

const sessionConfig = {
    name: 'monkey',
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        createtable: true,
        clearInterval: 1000 * 60 * 30,
      })
}

server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/login', LoginRouter)


server.get('/', (req, res) => {
    res.send('Sanity check')
})


module.exports = server

