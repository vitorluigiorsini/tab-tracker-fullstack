import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isUserLoggedIn: false
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setToken(token) {
      this.token = token
      if (token) {
        this.isUserLoggedIn = true
      } else {
        this.isUserLoggedIn = false
      }
    }
  }
})
