'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PanelContainer from '@/components/PanelContainer'
import { bookmarksService } from '@/services/bookmarks'
import { songsService } from '@/services/songs'
import { useUserStore } from '@/store/userStore'
import type { Song, Bookmark } from '@/types'

function BookmarksContent() {
  const [bookmarkedSongs, setBookmarkedSongs] = useState<Array<{ song: Song; bookmark: Bookmark }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isUserLoggedIn } = useUserStore()

    useEffect(() => {
    const loadBookmarks = async () => {
      if (!isUserLoggedIn || !user) {
        setBookmarkedSongs([])
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        // Get all bookmarks for the current user
        const bookmarks: Bookmark[] = await bookmarksService.indexByUserId(user.id)
        
        // For each bookmark, fetch the associated song details
        const songsWithBookmarks = await Promise.all(
          bookmarks.map(async (bookmark) => {
            try {
              const song = await songsService.show(bookmark.SongId)
              return { song, bookmark }
            } catch (err) {
              console.error(`Failed to fetch song for bookmark ${bookmark.id}:`, err)
              return null
            }
          })
        )
        
        // Filter out any failed requests
        setBookmarkedSongs(songsWithBookmarks.filter((item): item is { song: Song; bookmark: Bookmark } => item !== null))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookmarks')
        setBookmarkedSongs([])
      } finally {
        setIsLoading(false)
      }
    }

    loadBookmarks()
  }, [isUserLoggedIn, user])

  const handleRemoveBookmark = useCallback(async (bookmarkId: number) => {
    setError(null)
    try {
      await bookmarksService.delete(bookmarkId)
      // Remove the bookmarked song from our local state
      setBookmarkedSongs(prev => prev.filter(item => item.bookmark.id !== bookmarkId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove bookmark')
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <p className="text-sm text-gray-500">Loading your bookmarks...</p>
        </div>
      </div>
    )
  }

  if (!isUserLoggedIn || !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Please log in to view your bookmarks</p>
          <Link
            href="/login"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <PanelContainer title="Your Bookmarks">
          <div className="space-y-6">
            {bookmarkedSongs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't bookmarked any songs yet</p>
                <Link
                  href="/songs"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  Browse Songs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarkedSongs.map(({ song, bookmark }) => (
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
                        <p className="text-xs text-gray-500">{song.album}</p>
                        <div className="mt-4">
                          <Link
                            href={`/songs/${song.id}`}
                            className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            View Song
                          </Link>
                          <button
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                            className="ml-3 flex items-center px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                          >
                            Remove Bookmark
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PanelContainer>
      </div>
    </div>
  )
}

export default function BookmarksPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><p className="text-center text-gray-500">Loading...</p></div>}>
      <BookmarksContent />
    </Suspense>
  )
}