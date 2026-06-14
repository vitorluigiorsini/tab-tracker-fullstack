import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6">
        Welcome to Tab Tracker App!
      </h1>
      <div className="flex justify-center">
        <Image src="/guitar.png" alt="Guitar" width={400} height={400} className="max-w-xs" />
      </div>
    </div>
  )
}
