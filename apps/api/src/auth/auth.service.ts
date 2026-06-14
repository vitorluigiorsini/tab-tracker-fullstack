import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from '../entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException('This email address is already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepository.create({ email, password: hashedPassword })
    const savedUser = await this.userRepository.save(user)

    const { password: _, ...userJson } = savedUser
    return {
      user: userJson,
      token: this.signToken(userJson)
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('The login information was incorrect')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('The login information was incorrect')
    }

    const { password: _, ...userJson } = user
    return {
      user: userJson,
      token: this.signToken(userJson)
    }
  }

  async findAll() {
    return this.userRepository.find({ take: 10 })
  }

  private signToken(user: Partial<User>) {
    return this.jwtService.sign({ id: user.id, email: user.email })
  }
}
