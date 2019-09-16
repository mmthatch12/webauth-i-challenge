const bcrypt = require('bcrypt')

const Login = require('../login/login-model')

module.exports = (req, res, next) =>  {
    let { username, password } = req.headers

    Login.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: 'You shall not pass!'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Could not login'})
        })
}


