import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ZodSchema } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value)
    if (!result.success) {
      const error = result.error.errors[0]
      throw new BadRequestException(error.message)
    }
    return result.data
  }
}
