'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import PanelContainer from '@/components/PanelContainer'
import { songsService } from '@/services/songs'

const songSchema = z.object({
  title: z.string().min(1, 'Required'),
  artist: z.string().min(1, 'Required'),
  genre: z.string().min(1, 'Required'),
  album: z.string().min(1, 'Required'),
  albumImageUrl: z.string().min(1, 'Required'),
  youtubeId: z.string().min(1, 'Required'),
  lyrics: z.string().min(1, 'Required'),
  tab: z.string().min(1, 'Required')
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

  function updateField(field: string, value: string) {
    setSong((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreate() {
    setError(null)

    const result = songSchema.safeParse(song)
    if (!result.success) {
      setError('Please fill in all the required fields')
      return
    }

    try {
      await songsService.create(song)
      router.push('/songs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create song')
    }
  }

  const fields = [
    { key: 'title', label: 'Title' },
    { key: 'artist', label: 'Artist' },
    { key: 'genre', label: 'Genre' },
    { key: 'album', label: 'Album' },
    { key: 'albumImageUrl', label: 'Album Image Url' },
    { key: 'youtubeId', label: 'Youtube ID' }
  ] as const

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PanelContainer title="Song Info">
          <div className="space-y-4">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={song[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
                />
              </div>
            ))}
          </div>
        </PanelContainer>
        <div>
          <PanelContainer title="Song Structure">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lyrics</label>
                <textarea
                  value={song.lyrics}
                  onChange={(e) => updateField('lyrics', e.target.value)}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1 resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tab</label>
                <textarea
                  value={song.tab}
                  onChange={(e) => updateField('tab', e.target.value)}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1 resize-none"
                  rows={4}
                />
              </div>
            </div>
          </PanelContainer>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            onClick={handleCreate}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Song
          </button>
        </div>
      </div>
    </div>
  )
}
