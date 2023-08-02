const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.post('/register', (req, res) => {
  res.send(`Hello ${req.body.email}! Thanks for registering!`)
})

app.listen(8085, () => {
  console.log('Server listening on port 8085')
})
