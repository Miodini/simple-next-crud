import { NotFoundException } from '@nestjs/common'
import { USER_NOT_FOUND } from './error-codes'

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found', { description: USER_NOT_FOUND })
  }
}
