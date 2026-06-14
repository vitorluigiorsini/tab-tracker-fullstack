import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common'
import { BookmarksService } from './bookmarks.service'

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  async index(@Query('songId') songId: string, @Query('userId') userId: string) {
    return this.bookmarksService.findOne(+songId, +userId)
  }

  @Post()
  async post(@Body() body: { songId: number; userId: number }) {
    return this.bookmarksService.create(body.songId, body.userId)
  }

  @Delete(':bookmarkId')
  async delete(@Param('bookmarkId') bookmarkId: string) {
    return this.bookmarksService.remove(+bookmarkId)
  }
}
