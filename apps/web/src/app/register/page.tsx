'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import PanelContainer from '@/components/PanelContainer'
import { authService } from '@/services/auth'
import { useUserStore } from '@/store/userStore'

const registerSchema = z.object({
  email: z.string().email('You must provide a valid email address'),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9]{8,32}$/, 'Password must be 8-32 characters with only letters and numbers')
})

export default function RegisterPage() {
  const router = useRouter()
  const { setUser, setToken } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleRegister() {
    setError(null)

    if (password !== confirmPassword) {
      setError('The password confirmation is incorrect')
      return
    }

    const result = registerSchema.safeParse({ email, password })
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }

    try {
      const response = await authService.register({ email, password })
      setUser(response.user)
      setToken(response.token)
      router.push('/songs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <PanelContainer title="Register">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </div>
      </PanelContainer>
    </div>
  )
}
