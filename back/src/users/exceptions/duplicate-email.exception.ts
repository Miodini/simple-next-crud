import { BadRequestException } from '@nestjs/common'
import { DUPLICATE_EMAIL } from './error-codes'

export class DuplicateEmailExpection extends BadRequestException {
  constructor() {
    super('Email address is already in use', { description: DUPLICATE_EMAIL })
  }
}
