import { mockDeep } from 'jest-mock-extended'
import { BadRequestException } from '@nestjs/common'
import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import type { Request } from '@/common/types/request.type'

const mockVerifyIdToken = jest.fn()

jest.mock('firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: mockVerifyIdToken
  })
}))

describe('AuthController', () => {
  const authService = mockDeep<AuthService>()
  const authController = new AuthController(authService)

  it('should extract token and call sync()', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer test-token-123'
      }
    } as unknown as Request

    const decoded = { uid: 'abc123', email: 'john@example.com' }
    mockVerifyIdToken.mockResolvedValue(decoded)

    await authController.sync(mockReq)

    expect(mockVerifyIdToken).toHaveBeenCalledWith('test-token-123')
  })

  it('should throw BadRequestException if token is missing', async () => {
    const mockReq = {
      headers: {}
    } as Request

    await expect(authController.sync(mockReq)).rejects.toThrow(BadRequestException)
  })

  it('should throw BadRequestException if verifyIdToken fails', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer broken-token'
      }
    } as unknown as Request

    mockVerifyIdToken.mockRejectedValue(new Error('invalid-token'))

    await expect(authController.sync(mockReq)).rejects.toThrow(BadRequestException)
  })
})
