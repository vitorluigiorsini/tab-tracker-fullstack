import { api } from '@/lib/api'
import type { User } from '@/types'

interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  register(credentials: { email: string; password: string }) {
    return api<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },

  login(credentials: { email: string; password: string }) {
    return api<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }
}
