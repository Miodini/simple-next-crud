import { mockDeep } from 'jest-mock-extended'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { decodedAccount } from './__mocks__/decoded-account.mock'

describe('Auth Controller', () => {
  const authService = mockDeep<AuthService>()
  const authController = new AuthController(authService)

  it('should sync an account', async () => {
    authService.sync.mockResolvedValue()
    await expect(authController.sync(decodedAccount)).resolves.toBeUndefined()
  })
})
