const db = require('../data/db.config')

module.exports = {
    find,
    createUser,
    findBy,
    login
}

function find() {
    return db('users')
}

function findBy(crite) {
    return db('users').where(crite);
}

function createUser(cred) {
    return db('users')
        .insert(cred)
        .then(([user]) => {
            return user
        })
}

function login(cred) {
    return db('users')
        .insert(cred)
}