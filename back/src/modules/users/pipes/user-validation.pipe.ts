import { ValidationPipe, ValidationError } from '@nestjs/common'
import { ValidationException } from '../exceptions/validation.exception'

export class UserValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors.flatMap(error => Object.values(error.constraints || {})))
      }
    })
  }
}
