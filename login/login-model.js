const db = require('../data/db.config')

module.exports = {
    find,
    createUser,
    login
}

function find() {
    return db('users')
}

function createUser(cred) {
    return db('users')
        .insert(cred)
}

function login(cred) {
    return db('users')
        .insert(cred)
}