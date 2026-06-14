export interface User {
  id: number
  email: string
  password?: string
  createdAt?: string
  updatedAt?: string
}

export interface Song {
  id: number
  title: string
  artist: string
  genre: string
  album: string
  albumImageUrl: string
  youtubeId: string
  lyrics: string
  tab: string
  createdAt?: string
  updatedAt?: string
}

export interface Bookmark {
  id: number
  SongId: number
  UserId: number
  createdAt?: string
  updatedAt?: string
}
