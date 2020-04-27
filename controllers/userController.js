const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const userAuth = require('./../auth/userAuth')

const createUser = async (req, res, next) => {
  try {
    const match = await userAuth.register(req.body.username)
    if (match === true) {
      res.send('User already exists')
    } else {
      const hash = await bcrypt.hash(req.body.password, 10)
      await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      })
      res.send('User Created')
    }
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const match = await userAuth.login(req.body.username, req.body.password)
    if (!match) {
      res.send('Credentials do not match')
    } else {
      res.status(200).send('Login Successful')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  create: createUser,
  login: loginUser
}
