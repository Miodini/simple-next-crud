import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { auth } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import type { Request } from './types/request.type'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {
    initializeApp({
      projectId: 'simple-next-crud-ca1ee'
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    if (token) {
      try {
        const account = await auth().verifyIdToken(token)

        request.account = account
      } catch {
        throw new UnauthorizedException()
      }
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
