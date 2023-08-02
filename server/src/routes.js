module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send(`Hello ${req.body.email}! Thanks for registering!`)
  })
}
