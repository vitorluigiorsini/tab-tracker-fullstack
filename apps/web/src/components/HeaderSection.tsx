'use client'

import Link from 'next/link'
import { useUserStore } from '@/store/userStore'

export default function HeaderSection() {
  const { isUserLoggedIn, logout } = useUserStore()

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link href="/" className="font-bold text-lg mr-4 hover:opacity-90">
          TabTracker
        </Link>
        <Link href="/songs" className="hover:opacity-90">
          Browse
        </Link>
        <Link href="/bookmarks" className="hover:opacity-90">
          Bookmarks
        </Link>
        <div className="flex-1" />
        {!isUserLoggedIn ? (
          <>
            <Link href="/login" className="hover:opacity-90">
              Login
            </Link>
            <Link href="/register" className="hover:opacity-90">
              Sign Up
            </Link>
          </>
        ) : (
          <Link href="/" onClick={logout} className="hover:opacity-90">
            Log Out
          </Link>
        )}
      </div>
    </header>
  )
}
