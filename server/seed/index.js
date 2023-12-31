const { sequelize, Song, User, Bookmark } = require('../src/models')

const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')

sequelize.sync({ force: true }).then(async function () {
  await Promise.all(
    users.map((user) => {
      User.create(user)
    })
  )

  await Promise.all(
    songs.map((song) => {
      Song.create(song)
    })
  )

  setTimeout(async () => {
    await Promise.all(
      bookmarks.map((bookmark) => {
        Bookmark.create(bookmark)
      })
    )
  }, 1000)
})
