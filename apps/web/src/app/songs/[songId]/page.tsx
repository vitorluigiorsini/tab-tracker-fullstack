'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PanelContainer from '@/components/PanelContainer'
import { songsService } from '@/services/songs'
import { bookmarksService } from '@/services/bookmarks'
import { useUserStore } from '@/store/userStore'
import type { Song, Bookmark } from '@/types'

export default function ViewSongPage() {
  const params = useParams()
  const { user, isUserLoggedIn } = useUserStore()
  const [song, setSong] = useState<Song | null>(null)
  const [bookmark, setBookmark] = useState<Bookmark | null>(null)
  const [isTabActive, setIsTabActive] = useState(true)

  useEffect(() => {
    const songId = Number(params.songId)
    songsService.show(songId).then(setSong)
  }, [params.songId])

  useEffect(() => {
    if (!song || !isUserLoggedIn || !user) return
    bookmarksService.index({ songId: song.id, userId: user.id }).then(setBookmark)
  }, [song, isUserLoggedIn, user])

  if (!song) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  async function setAsBookmark() {
    if (!user || !song) return
    try {
      const result = await bookmarksService.post({ songId: song.id, userId: user.id })
      setBookmark(result)
    } catch {}
  }

  async function unsetAsBookmark() {
    if (!bookmark) return
    try {
      await bookmarksService.delete(bookmark.id)
      setBookmark(null)
    } catch {}
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PanelContainer
        title="Song Info"
        action={
          <Link
            href={`/songs/${song.id}/edit`}
            className="text-white hover:opacity-80 text-sm"
          >
            Edit
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            {song.albumImageUrl && (
              <Image src={song.albumImageUrl} alt={song.album} width={160} height={160} className="rounded mx-auto" />
            )}
            <p className="text-sm text-gray-600 mt-1">{song.album}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">{song.title}</h2>
            <p className="text-lg text-gray-700">{song.artist}</p>
            <p className="text-sm text-gray-500">{song.genre}</p>
            <div className="mt-3">
              {isUserLoggedIn && (
                <button
                  onClick={bookmark ? unsetAsBookmark : setAsBookmark}
                  className={`text-2xl ${bookmark ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                  title={bookmark ? 'Remove bookmark' : 'Add bookmark'}
                >
                  {bookmark ? '♥' : '♡'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setIsTabActive(true)}
              className={`px-3 py-1 rounded text-sm ${isTabActive ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Tab
            </button>
            <button
              onClick={() => setIsTabActive(false)}
              className={`px-3 py-1 rounded text-sm ${!isTabActive ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Lyrics
            </button>
          </div>
          <textarea
            readOnly
            value={isTabActive ? song.tab : song.lyrics}
            className="w-full border rounded p-2 text-sm font-mono bg-gray-50 resize-none"
            rows={10}
          />
        </div>

        <div className="mt-6">
          <div className="aspect-video bg-black rounded overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${song.youtubeId}`}
              title={`${song.artist} - ${song.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </PanelContainer>
    </div>
  )
}
