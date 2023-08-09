const bcrypt = require('bcrypt')

function hashPassword(user, options) {
  const SALT_FACTOR = 10

  if (!user.changed('password')) {
    return
  }

  return bcrypt.hash(user.password, SALT_FACTOR).then((hash) => {
    user.setDataValue('password', hash)
  })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
        // Escolher entre "beforeSave" ou "beforeCreate" e "beforeUpdate". Se usar todos o hash será duplicado causando erro na comparação das senhas.
        // beforeSave: hashPassword
      }
    }
  )

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
