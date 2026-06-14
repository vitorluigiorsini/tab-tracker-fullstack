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

  useEffect(() => {
    const loadSongs = async () => {
      const query = searchParams.get('search') || undefined
      const data = await songsService.index(query)
      setSongs(data)
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by song title, artist, album or genre"
          className="w-full border-2 border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
      <PanelContainer
        title="Songs List"
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
        {songs.length === 0 ? (
          <p className="text-gray-500">No songs found</p>
        ) : (
          <div className="space-y-4">
            {songs.map((song) => (
              <div key={song.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                  <p className="text-xs text-gray-500">{song.genre}</p>
                  <Link
                    href={`/songs/${song.id}`}
                    className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View
                  </Link>
                </div>
                <div className="text-center">
                  {song.albumImageUrl && (
                    <Image
                      src={song.albumImageUrl}
                      alt={song.album}
                      width={120}
                      height={120}
                      className="rounded mx-auto"
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">{song.album}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelContainer>
    </div>
  )
}

export default function SongsPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
      <SongsContent />
    </Suspense>
  )
}
