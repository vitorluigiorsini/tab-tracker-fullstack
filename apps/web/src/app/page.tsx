import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
        Welcome to Tab Tracker
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Track, learn, and organize your guitar tabs and songs in one place
      </p>
      <div className="flex justify-center items-center gap-4 mb-8">
        <Link
          href="/songs"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          Browse Songs
        </Link>
        <Link
          href="/songs/create"
          className="border border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Add New Song
        </Link>
      </div>
      <div className="flex justify-center">
        <Image
          src="/guitar.png"
          alt="Acoustic guitar"
          width={400}
          height={400}
          className="max-w-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </div>
    </div>
  )
}
