const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        limit: 10
      })
      res.send(users)
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred trying to fetch the users'
      })
    }
  },
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email address is already registered'
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred while trying to login'
      })
    }
  }
}
