'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PanelContainer from '@/components/PanelContainer'
import { songsService } from '@/services/songs'
import type { Song } from '@/types'

export default function EditSongPage() {
  const router = useRouter()
  const params = useParams()
  const [song, setSong] = useState<Song | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadSong = async () => {
      setIsLoading(true)
      try {
        const songId = Number(params.songId)
        const data = await songsService.show(songId)
        setSong(data)
      } finally {
        setIsLoading(false)
      }
    }
    loadSong()
  }, [params.songId])

  function updateField(field: string, value: string) {
    if (!song) return
    setSong({ ...song, [field]: value })
  }

  async function handleSave() {
    if (!song) return
    setError(null)

    const areAllFieldsFilledIn = (
      ['title', 'artist', 'genre', 'album', 'albumImageUrl', 'youtubeId', 'lyrics', 'tab'] as const
    ).every((key) => !!song[key])

    if (!areAllFieldsFilledIn) {
      setError('Please fill in all the required fields')
      return
    }

    setIsLoading(true)
    try {
      await songsService.update(song)
      router.push(`/songs/${song.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save song')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  if (!song) {
    return <p className="text-center text-gray-500">Song not found</p>
  }

  const fields = [
    { key: 'title', label: 'Title' },
    { key: 'artist', label: 'Artist' },
    { key: 'genre', label: 'Genre' },
    { key: 'album', label: 'Album' },
    { key: 'albumImageUrl', label: 'Album Image URL' },
    { key: 'youtubeId', label: 'YouTube Video ID' }
  ] as const

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mb-6">
        <PanelContainer title="Edit Song">
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Song Info Section */}
              <div>
                <PanelContainer title="Song Information">
                  <div className="space-y-6">
                    {fields.map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <input
                          type="text"
                          id={key}
                          value={(song[key] as string) || ''}
                          onChange={(e) => updateField(key, e.target.value)}
                          autoComplete="off"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>
                </PanelContainer>
              </div>
              
              {/* Song Structure Section */}
              <div>
                <PanelContainer title="Song Content">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lyrics
                      </label>
                      <textarea
                        id="lyrics"
                        value={song.lyrics || ''}
                        onChange={(e) => updateField('lyrics', e.target.value)}
                        autoComplete="off"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guitar Tab
                      </label>
                      <textarea
                        id="tab"
                        value={song.tab || ''}
                        onChange={(e) => updateField('tab', e.target.value)}
                        autoComplete="off"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={5}
                      />
                    </div>
                  </div>
                </PanelContainer>
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </p>
            )}
            
            <div className="pt-6">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Saving song...</span>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </PanelContainer>
      </div>
    </div>
  )
}