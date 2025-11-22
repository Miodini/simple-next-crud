import { Test } from '@nestjs/testing'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { AuthService } from '@/modules/auth/auth.service'
import { PrismaService } from '@/modules/prisma/prisma.service'
import { account } from './__mocks__/account.mock'
import { decodedAccount } from './__mocks__/decoded-account.mock'

describe('Auth Service', () => {
  let prismaService: DeepMockProxy<PrismaService>
  let authService: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() }
      ]
    })
      .compile()

    prismaService = moduleRef.get(PrismaService)
    authService = moduleRef.get(AuthService)
  })

  it('should sync an account', async () => {
    prismaService.account.upsert.mockResolvedValue(account)
    await expect(authService.sync(decodedAccount)).resolves.toBeUndefined()
  })
})
