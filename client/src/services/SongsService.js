import Api from './Api'

export default {
  index(search) {
    return Api().get('songs', {
      params: { search: search }
    })
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
