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

  useEffect(() => {
    const songId = Number(params.songId)
    songsService.show(songId).then(setSong)
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

    try {
      await songsService.update(song)
      router.push(`/songs/${song.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save song')
    }
  }

  if (!song) {
    return <p className="text-center text-gray-500">Loading...</p>
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
                  value={(song[key] as string) || ''}
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
                  value={song.lyrics || ''}
                  onChange={(e) => updateField('lyrics', e.target.value)}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1 resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tab</label>
                <textarea
                  value={song.tab || ''}
                  onChange={(e) => updateField('tab', e.target.value)}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1 resize-none"
                  rows={4}
                />
              </div>
            </div>
          </PanelContainer>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Song
          </button>
        </div>
      </div>
    </div>
  )
}
