import { create } from 'zustand'
import type { User } from '@/types'

interface UserState {
  user: User | null
  token: string | null
  isUserLoggedIn: boolean
  setUser: (user: User) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isUserLoggedIn: false,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      sessionStorage.setItem('token', token)
      set({ token, isUserLoggedIn: true })
    } else {
      sessionStorage.removeItem('token')
      set({ token: null, isUserLoggedIn: false })
    }
  },
  logout: () => {
    sessionStorage.removeItem('token')
    set({ user: null, token: null, isUserLoggedIn: false })
  }
}))
