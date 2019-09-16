const express = require('express')
const bcrypt = require('bcrypt')

const Login = require('./login-model')

const router = express.Router()

router.get('/users', (req, res) => {
    Login.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Could not load users'})
        })
})

router.post('/register', (req, res) => {
    let { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 10)

    Login.createUser({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Could not create user' })
        })
})


module.exports = router