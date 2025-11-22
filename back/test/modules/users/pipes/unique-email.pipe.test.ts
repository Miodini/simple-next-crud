import { Test } from '@nestjs/testing'
import { REQUEST } from '@nestjs/core'
import { BadRequestException } from '@nestjs/common'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { Request } from 'express'
import { PrismaService } from '@/modules/prisma/prisma.service'
import { UniqueEmailPipe } from '@/modules/users/pipes/unique-email.pipe'
import { CreateUserDto, UpdateUserDto } from '@/modules/users/users.dto'
import { users } from '../__mocks__/users.mock'

describe('UniqueEmailPipe', () => {
  describe('POST', () => {
    let prismaService: DeepMockProxy<PrismaService>
    let request: Request
    let uniqueEmailPipe: UniqueEmailPipe<CreateUserDto>

    beforeEach(async () => {
      const mockRequest = { params: {} }
      const moduleRef = await Test.createTestingModule({
        providers: [
          { provide: PrismaService, useValue: mockDeep<PrismaService>() },
          { provide: REQUEST, useValue: mockRequest }
        ]
      })
        .compile()

      prismaService = moduleRef.get(PrismaService)
      request = moduleRef.get(REQUEST)
      uniqueEmailPipe = new UniqueEmailPipe(prismaService, request)
    })

    it('should validate a unique email', async () => {
      const newUser: CreateUserDto = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      prismaService.user.findFirst.mockResolvedValue(null)

      await expect(uniqueEmailPipe.transform(newUser)).resolves.toBe(newUser)
    })
    it('should reject a duplicate email', async () => {
      const newUser: CreateUserDto = {
        name: 'Rin Hoshizora',
        email: users[0].email,
        phone: '1283392',
        gender: 'F'
      }
      prismaService.user.findFirst.mockResolvedValue(users[0])
      await expect(uniqueEmailPipe.transform(newUser)).rejects.toThrow(BadRequestException)
    })
  })

  describe('PUT', () => {
    let prismaService: DeepMockProxy<PrismaService>
    let request: Request
    let uniqueEmailPipe: UniqueEmailPipe<UpdateUserDto>

    beforeEach(async () => {
      const mockRequest = { params: { id: `${users[0].id}` } }
      const moduleRef = await Test.createTestingModule({
        providers: [
          { provide: PrismaService, useValue: mockDeep<PrismaService>() },
          { provide: REQUEST, useValue: mockRequest }
        ]
      })
        .compile()

      prismaService = moduleRef.get(PrismaService)
      request = moduleRef.get(REQUEST)
      uniqueEmailPipe = new UniqueEmailPipe(prismaService, request)
    })

    it('should validate a unique email', async () => {
      const newUser: UpdateUserDto = {
        name: 'Rin Hoshizora',
        email: 'rin@email.com',
        phone: '1283392',
        gender: 'F'
      }
      prismaService.user.findFirst.mockResolvedValue(null)

      await expect(uniqueEmailPipe.transform(newUser)).resolves.toBe(newUser)
    })
    it('should validate a user update with their own email', async () => {
      const newUser: UpdateUserDto = {
        name: 'Rin Hoshizora',
        email: users[0].email,
        phone: '1283392',
        gender: 'F'
      }
      prismaService.user.findFirst.mockResolvedValue(null)

      await expect(uniqueEmailPipe.transform(newUser)).resolves.toBe(newUser)
    })
    it('should reject a duplicate email', async () => {
      const newUser: UpdateUserDto = {
        name: 'Rin Hoshizora',
        email: users[1].email,
        phone: '1283392',
        gender: 'F'
      }
      prismaService.user.findFirst.mockResolvedValue(users[1])
      await expect(uniqueEmailPipe.transform(newUser)).rejects.toThrow(BadRequestException)
    })
  })
})
