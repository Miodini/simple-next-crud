import { BadRequestException } from '@nestjs/common'
import { VALIDATION_ERROR } from './error-codes'

export class ValidationException extends BadRequestException {
  constructor(message?: string | string[]) {
    super(message || 'Validation error', { description: VALIDATION_ERROR })
  }
}
