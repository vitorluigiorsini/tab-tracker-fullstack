import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Bookmark } from '../entities/bookmark.entity'

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>
  ) {}

  async findOne(songId: number, userId: number) {
    return this.bookmarkRepository.findOne({
      where: { SongId: songId, UserId: userId }
    })
  }

  async create(songId: number, userId: number) {
    const existing = await this.findOne(songId, userId)
    if (existing) {
      throw new ConflictException('You already have this set as a bookmark')
    }

    const bookmark = this.bookmarkRepository.create({ SongId: songId, UserId: userId })
    return this.bookmarkRepository.save(bookmark)
  }

  async remove(id: number) {
    const bookmark = await this.bookmarkRepository.findOne({ where: { id } })
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found')
    }
    return this.bookmarkRepository.remove(bookmark)
  }
}
