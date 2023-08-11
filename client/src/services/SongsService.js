import Api from './Api'

export default {
  index() {
    return Api().get('songs')
  },
  create(song) {
    return Api().post('songs', song)
  }
}
