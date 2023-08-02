module.exports = {
  port: process.env.PORT || 8085,
  db: {
    database: process.env.DB_NAME || 'tab-tracker',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
    options: {
      host: process.env.HOST || 'localhost',
      dialect: process.env.DIALECT || 'postgresql'
    }
  }
}
