'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PanelContainer from '@/components/PanelContainer'
import { songsService } from '@/services/songs'
import type { Song } from '@/types'

function SongsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadSongs = async () => {
      setIsLoading(true)
      try {
        const query = searchParams.get('search') || undefined
        const data = await songsService.index(query)
        setSongs(data)
      } finally {
        setIsLoading(false)
      }
    }
    loadSongs()
  }, [searchParams])

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`/songs?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <PanelContainer
          title="Songs Library"
          action={
            <Link
              href="/songs/create"
              className="text-white hover:opacity-80 text-xl leading-none"
              title="Add song"
            >
              +
            </Link>
          }
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="search-input" className="sr-only">
                Search songs
              </label>
              <input
                type="text"
                id="search-input"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by song title, artist, album or genre..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <p className="text-sm text-gray-500">Loading songs...</p>
              </div>
            ) : (
              songs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No songs found</p>
                  {search && (
                    <p className="mt-2 text-sm">
                      Try searching for something else or <Link href="/songs/create" className="font-medium text-blue-600 hover:text-blue-700">add a song</Link>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {songs.map((song) => (
                    <div key={song.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 p-4">
                        {song.albumImageUrl && (
                          <Image
                            src={song.albumImageUrl}
                            alt={`${song.album} album cover`}
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{song.title}</h3>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                          <p className="text-xs text-gray-500">{song.genre}</p>
                          <div className="mt-3">
                            <Link
                              href={`/songs/${song.id}`}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                              View Song
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </PanelContainer>
      </div>
    </div>
  )
}

export default function SongsPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><p className="text-center text-gray-500">Loading...</p></div>}>
      <SongsContent />
    </Suspense>
  )
}