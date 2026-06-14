import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { SongsModule } from './songs/songs.module'
import { BookmarksModule } from './bookmarks/bookmarks.module'
import { User } from './entities/user.entity'
import { Song } from './entities/song.entity'
import { Bookmark } from './entities/bookmark.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: ':memory:',
      entities: [User, Song, Bookmark],
      synchronize: true,
      logging: false
    }),
    AuthModule,
    SongsModule,
    BookmarksModule
  ]
})
export class AppModule {}
