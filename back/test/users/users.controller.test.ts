import { Test } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { type User } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { UsersService } from '@/users/users.service'
import { PrismaService } from '@/prisma.service'
import { UsersController } from '@/users/users.controller'

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '123456789',
    gender: 'M'
  },
  {
    id: 2,
    name: 'Mary Smith',
    email: 'marysmith@email.com',
    phone: '987654321',
    gender: 'F'
  }
]

describe('UserController', () => {
  let usersService: DeepMockProxy<UsersService>
  let usersController: DeepMockProxy<UsersController>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockDeep<UsersService>())
      .compile()

    usersService = moduleRef.get(UsersService)
    usersController = moduleRef.get(UsersController)
  })

  describe('getAll', () => {
    it('should return all users', async () => {
      usersService.getAll.mockResolvedValue(users)
      await expect(usersController.getAll()).resolves.toBe(users)
    })
  })

  describe('getOne', () => {
    it('should return a single user', async () => {
      usersService.getOne.mockResolvedValue(users[0])
      await expect(usersController.getUser(users[0].id)).resolves.toBe(users[0])
    })

    it('should not find a matching user', async () => {
      usersService.getOne.mockResolvedValue(null)
      await expect(usersController.getUser(3)).rejects.toThrow(NotFoundException)
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      usersService.create.mockResolvedValue(users[0])
      await expect(usersController.createUser(users[0])).resolves.toBe(users[0])
    })
  })

  describe('update', () => {
    it('should update a existing user', async () => {
      const updatedUser: User = { ...users[1], id: users[0].id }

      usersService.update.mockResolvedValue(updatedUser)
      await expect(usersController.updateUser(users[0].id, users[1])).resolves.toBeUndefined()
    })

    it('should fail to update a non-existing user', async () => {
      usersService.update.mockResolvedValue(null)
      await expect(usersController.updateUser(users[0].id, users[1])).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a existing user', async () => {
      usersService.delete.mockResolvedValue(users[0])
      await expect(usersController.deleteUser(users[0].id)).resolves.toBeUndefined()
    })

    it('should fail to delete a non-existing user', async () => {
      usersService.delete.mockResolvedValue(null)
      await expect(usersController.deleteUser(3)).rejects.toThrow(NotFoundException)
    })
  })
})
