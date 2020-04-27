const bcrypt = require('bcrypt')
const User = require('./../models/userModel')

// User login : compare passwords
const userLogin = async (username, password) => {
  const findUser = await User.find({ username: username })
  const match = await bcrypt.compare(password, findUser[0].password)
  if (match) {
    return true
  } else {
    return false
  }
}

// User register compare
const userRegister = async username => {
  const findUser = await User.exists({ username: username })
  if (findUser) {
    return true
  }
}

module.exports = {
  login: userLogin,
  register: userRegister
}
