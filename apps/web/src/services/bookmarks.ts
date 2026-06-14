import { api } from '@/lib/api'
import type { Bookmark } from '@/types'

export const bookmarksService = {
  index(query: { songId: number; userId: number }) {
    const params = new URLSearchParams({
      songId: String(query.songId),
      userId: String(query.userId)
    })
    return api<Bookmark | null>(`/bookmarks?${params}`)
  },

  post(data: { songId: number; userId: number }) {
    return api<Bookmark>('/bookmarks', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  delete(bookmarkId: number) {
    return api<void>(`/bookmarks/${bookmarkId}`, {
      method: 'DELETE'
    })
  }
}
