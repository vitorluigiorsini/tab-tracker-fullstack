import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { AuthService } from './auth.service'
import { ZodValidationPipe } from './zod-validation.pipe'

const registerSchema = z.object({
  email: z.string().email('You must provide a valid email address'),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9]{8,32}$/, 'Password must be 8-32 chars with only letters and numbers')
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  async index() {
    return this.authService.findAll()
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() body: z.infer<typeof registerSchema>) {
    return this.authService.register(body.email, body.password)
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() body: z.infer<typeof loginSchema>) {
    return this.authService.login(body.email, body.password)
  }
}
