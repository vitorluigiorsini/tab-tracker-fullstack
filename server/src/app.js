const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const config = require('./config/config')
const { sequelize } = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

// Usar o parametro {force: true} no sync() para zerar o bando de bados
sequelize.sync().then(() => {
  app.listen(config.port)
  console.log(`Server listening on port ${config.port}`)
})
