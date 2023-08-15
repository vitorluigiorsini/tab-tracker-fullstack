import Api from './Api'

export default {
  index() {
    return Api().get('songs')
  },
  show(songId) {
    return Api().get(`songs/${songId}`)
  },
  create(song) {
    return Api().post('songs', song)
  },
  update(song) {
    return Api().put(`songs/${song.id}`, song)
  }
}
