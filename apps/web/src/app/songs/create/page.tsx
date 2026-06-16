'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import PanelContainer from '@/components/PanelContainer'
import { songsService } from '@/services/songs'

const songSchema = z.object({
  title: z.string().min(1, 'Song title is required'),
  artist: z.string().min(1, 'Artist name is required'),
  genre: z.string().min(1, 'Genre is required'),
  album: z.string().min(1, 'Album name is required'),
  albumImageUrl: z.string().url('Please enter a valid image URL'),
  youtubeId: z.string().min(1, 'YouTube ID is required'),
  lyrics: z.string().min(1, 'Lyrics are required'),
  tab: z.string().min(1, 'Tab is required')
})

export default function CreateSongPage() {
  const router = useRouter()
  const [song, setSong] = useState({
    title: '',
    artist: '',
    genre: '',
    album: '',
    albumImageUrl: '',
    youtubeId: '',
    lyrics: '',
    tab: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function updateField(field: string, value: string) {
    setSong((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreate() {
    setError(null)

    const result = songSchema.safeParse(song)
    if (!result.success) {
      // Find the first error for better UX
      const firstError = result.error.errors[0]
      setError(firstError.message)
      return
    }

    setIsLoading(true)
    try {
      await songsService.create(song)
      router.push('/songs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create song')
    } finally {
      setIsLoading(false)
    }
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
        <PanelContainer title="Create a New Song">
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
                          value={song[key]}
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
                        value={song.lyrics}
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
                        value={song.tab}
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
                onClick={handleCreate}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Creating song...</span>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  </>
                ) : (
                  'Create Song'
                )}
              </button>
            </div>
          </div>
        </PanelContainer>
      </div>
    </div>
  )
}