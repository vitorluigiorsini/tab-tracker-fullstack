import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Song } from '../entities/song.entity'

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.songRepository.find({
        where: [
          { title: Like(`%${search}%`) },
          { artist: Like(`%${search}%`) },
          { album: Like(`%${search}%`) },
          { genre: Like(`%${search}%`) }
        ],
        take: 10
      })
    }
    return this.songRepository.find({ take: 10 })
  }

  async findOne(id: number) {
    const song = await this.songRepository.findOne({ where: { id } })
    if (!song) {
      throw new NotFoundException('Song not found')
    }
    return song
  }

  async create(data: Partial<Song>) {
    const song = this.songRepository.create(data)
    return this.songRepository.save(song)
  }

  async update(id: number, data: Partial<Song>) {
    await this.songRepository.update(id, data)
    return this.songRepository.findOne({ where: { id } })
  }

  async remove(id: number) {
    const song = await this.findOne(id)
    return this.songRepository.remove(song)
  }
}
