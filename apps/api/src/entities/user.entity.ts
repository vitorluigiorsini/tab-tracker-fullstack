import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Bookmark } from './bookmark.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[]
}
