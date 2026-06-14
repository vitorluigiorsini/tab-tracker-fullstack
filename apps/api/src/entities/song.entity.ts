import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Bookmark } from './bookmark.entity'

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  artist: string

  @Column()
  genre: string

  @Column()
  album: string

  @Column()
  albumImageUrl: string

  @Column()
  youtubeId: string

  @Column('text')
  lyrics: string

  @Column('text')
  tab: string

  @OneToMany(() => Bookmark, (bookmark) => bookmark.song)
  bookmarks: Bookmark[]
}
