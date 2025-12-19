import { NotFoundException } from '@nestjs/common'
import { mockDeep } from 'jest-mock-extended'
import { UsersService } from '@/modules/users/users.service'
import { UsersController } from '@/modules/users/users.controller'
import type { User } from '@prisma/client'
import { users } from './__mocks__/users.mock'

describe('UserController', () => {
  const usersService = mockDeep<UsersService>()
  const usersController = new UsersController(usersService)

  describe('getAll', () => {
    it('should return all users', async () => {
      usersService.getAll.mockResolvedValue(users)
      await expect(usersController.getAll(users[0].accountId)).resolves.toBe(users)
    })
  })

  describe('getOne', () => {
    it('should return a single user', async () => {
      usersService.getOne.mockResolvedValue(users[0])
      await expect(usersController.getUser(users[0].id, users[0].accountId)).resolves.toBe(users[0])
    })

    it('should not find a matching user', async () => {
      usersService.getOne.mockResolvedValue(null)
      await expect(usersController.getUser(3, users[0].accountId)).rejects.toThrow(NotFoundException)
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      usersService.create.mockResolvedValue(users[0])
      await expect(usersController.createUser(users[0], users[0].accountId)).resolves.toBe(users[0])
    })
  })

  describe('update', () => {
    it('should update a existing user', async () => {
      const updatedUser: User = { ...users[1], id: users[0].id }

      usersService.update.mockResolvedValue(updatedUser)
      await expect(usersController.updateUser(users[0].id, users[0].accountId, users[1])).resolves.toBeUndefined()
    })

    it('should fail to update a non-existing user', async () => {
      usersService.update.mockResolvedValue(null)
      await expect(usersController.updateUser(users[0].id, users[0].accountId, users[1])).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete a existing user', async () => {
      usersService.delete.mockResolvedValue(users[0])
      await expect(usersController.deleteUser(users[0].id, users[0].accountId)).resolves.toBeUndefined()
    })

    it('should fail to delete a non-existing user', async () => {
      usersService.delete.mockResolvedValue(null)
      await expect(usersController.deleteUser(3, users[0].accountId)).rejects.toThrow(NotFoundException)
    })
  })
})
