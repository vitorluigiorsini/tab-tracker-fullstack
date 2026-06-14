import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'
import { Song } from './song.entity'

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.bookmarks)
  @JoinColumn({ name: 'UserId' })
  user: User

  @Column()
  UserId: number

  @ManyToOne(() => Song, (song) => song.bookmarks)
  @JoinColumn({ name: 'SongId' })
  song: Song

  @Column()
  SongId: number
}
