import type { Metadata } from 'next'
import './globals.css'
import HeaderSection from '@/components/HeaderSection'

export const metadata: Metadata = {
  title: 'Tab Tracker',
  description: 'Track your guitar tabs and songs'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <HeaderSection />
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
