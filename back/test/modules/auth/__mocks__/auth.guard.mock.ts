import { CanActivate, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export class AuthGuardMock implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Partial<Request>>()
    request['account'] = {
      name: 'Admin',
      email: 'admin@email.com',
      uid: 'abcdefghijk',
      id: 1
    }

    return true
  }
}
