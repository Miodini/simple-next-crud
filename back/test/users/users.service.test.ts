import { Test } from '@nestjs/testing'
import { Prisma, PrismaClient, type User } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { UsersService } from '@/users/users.service'
import { PrismaService } from '@/prisma.service'
import { users } from './__mocks__/users.mock'

describe('UsersService', () => {
  let prismaService: DeepMockProxy<PrismaService>
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockDeep<PrismaClient>() }
      ]
    })
      .compile()

    prismaService = moduleRef.get(PrismaService)
    usersService = moduleRef.get(UsersService)
  })

  describe('getAll', () => {
    it('should return all users', async () => {
      prismaService.user.findMany.mockResolvedValue(users)
      expect(await usersService.getAll()).toBe(users)
    })
  })

  describe('getOne', () => {
    it('should return a single user', async () => {
      prismaService.user.findUnique.mockResolvedValue(users[0])
      expect(await usersService.getOne(users[0].id)).toBe(users[0])
    })

    it('should not find a matching user', async () => {
      prismaService.user.findUnique.mockResolvedValue(null)
      expect(await usersService.getOne(3)).toBe(null)
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      prismaService.user.create.mockResolvedValue(users[0])
      expect(await usersService.create(users[0])).toBe(users[0])
    })
  })

  describe('update', () => {
    it('should update a existing user', async () => {
      const updatedUser: User = { ...users[1], id: users[0].id }

      prismaService.user.update.mockResolvedValue(updatedUser)
      expect(await usersService.update(users[0].id, users[1])).toBe(updatedUser)
    })

    it('should fail to update a non-existing user', async () => {
      prismaService.user.update.mockImplementation(() => {
        throw new Prisma.PrismaClientKnownRequestError('', { clientVersion: '1', code: 'P2025' })
      })
      expect(await usersService.update(users[0].id, users[1])).toBe(null)
    })
  })

  describe('delete', () => {
    it('should delete a existing user', async () => {
      prismaService.user.delete.mockResolvedValue(users[0])
      expect(await usersService.delete(users[0].id)).toBe(users[0])
    })

    it('should fail to delete a non-existing user', async () => {
      prismaService.user.delete.mockImplementation(() => {
        throw new Prisma.PrismaClientKnownRequestError('', { clientVersion: '1', code: 'P2025' })
      })
      expect(await usersService.delete(3)).toBe(null)
    })
  })
})
