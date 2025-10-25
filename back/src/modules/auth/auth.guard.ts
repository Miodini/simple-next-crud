import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { auth } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { PrismaService } from '../prisma/prisma.service'
import type { Request } from '@/common/types/request.type'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {
    initializeApp({ projectId: 'simple-next-crud-ca1ee' })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()
    try {
      const account = await auth().verifyIdToken(token)
      const accountId = await this.getAccountIdFromUid(account.uid)

      request.account = { ...account, id: accountId }
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    return type === 'Bearer' ? token : undefined
  }

  private async getAccountIdFromUid(uid: string): Promise<number> {
    const account = await this.prismaService.account.findUniqueOrThrow({ select: { id: true }, where: { uid } })

    return account.id
  }
}
