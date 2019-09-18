const express = require('express')
const bcrypt = require('bcrypt')

const restricted = require('../auth/login-middleware')

const Login = require('./login-model')

const router = express.Router()

router.post('/register', (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds

  Login.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  Login.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'You cannot pass!' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});


router.get('/users', restricted, (req, res) => {
    Login.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Could not load users'})
        })
})

  router.get('/logout', (req, res) => {
    if(req.session) {
      req.session.destroy(err => {
        if(err) {
          res.json({ message: 'Could not logout' })
        } else {
          res.status(200).json({ message: 'See ya!'})
        }
      }) 
    } else {
      res.status(200).json({ message: 'No sessions in progress'})
    }
  })


module.exports = router