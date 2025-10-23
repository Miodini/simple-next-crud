import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import type { DecodedAccount } from '@/common/types/decoded-account.type'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(account: DecodedAccount) {
    await this.prisma.account.upsert({
      create: { uid: account.uid, name: account.name || 'Unknown Unknown', email: account.email || 'nil' },
      update: { name: account.name, email: account.email },
      where: { uid: account.uid }
    })
  }
}
