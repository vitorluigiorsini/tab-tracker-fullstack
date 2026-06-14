import { api } from '@/lib/api'
import type { Song } from '@/types'

export const songsService = {
  index(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : ''
    return api<Song[]>(`/songs${params}`)
  },

  show(songId: number) {
    return api<Song>(`/songs/${songId}`)
  },

  create(song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>) {
    return api<Song>('/songs', {
      method: 'POST',
      body: JSON.stringify(song)
    })
  },

  update(song: Song) {
    return api<Song>(`/songs/${song.id}`, {
      method: 'PUT',
      body: JSON.stringify(song)
    })
  }
}
