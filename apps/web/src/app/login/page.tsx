'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import PanelContainer from '@/components/PanelContainer'
import { authService } from '@/services/auth'
import { useUserStore } from '@/store/userStore'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
})

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setToken } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setError(null)

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }

    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      setToken(response.token)
      router.push('/songs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <PanelContainer title="Login">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-sm text-gray-600">
            Need an account?{' '}
            <Link href="/register" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </div>
      </PanelContainer>
    </div>
  )
}
