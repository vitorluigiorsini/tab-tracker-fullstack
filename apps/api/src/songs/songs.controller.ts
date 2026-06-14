import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { SongsService } from './songs.service'

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  async index(@Query('search') search?: string) {
    return this.songsService.findAll(search)
  }

  @Get(':songId')
  async show(@Param('songId') songId: string) {
    return this.songsService.findOne(+songId)
  }

  @Post()
  async create(@Body() body: Record<string, unknown>) {
    return this.songsService.create(body)
  }

  @Put(':songId')
  async update(@Param('songId') songId: string, @Body() body: Record<string, unknown>) {
    return this.songsService.update(+songId, body)
  }

  @Delete(':songId')
  async delete(@Param('songId') songId: string) {
    return this.songsService.remove(+songId)
  }
}
