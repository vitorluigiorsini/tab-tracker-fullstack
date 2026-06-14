import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SongsController } from './songs.controller'
import { SongsService } from './songs.service'
import { Song } from '../entities/song.entity'
import { Bookmark } from '../entities/bookmark.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Song, Bookmark])],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
