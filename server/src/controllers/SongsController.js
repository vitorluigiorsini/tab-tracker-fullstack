const { Song } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            $or: ['title', 'artist', 'album', 'genre'].map((key) => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'An error occurred trying to fetch the songs'
      })
    }
  },
  async show(req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred trying to show the song'
      })
    }
  },
  async update(req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred trying to update the song'
      })
    }
  },
  async create(req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred trying to create the song'
      })
    }
  },
  async delete(req, res) {
    try {
      await Song.destroy({
        where: {
          id: req.params.songId
        }
      })
      res.send({
        message: 'Song deleted with success!'
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error occurred trying to delete the song'
      })
    }
  }
}
