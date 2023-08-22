module.exports = {
  port: process.env.PORT || 8085,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres123@localhost/tab-tracker',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
