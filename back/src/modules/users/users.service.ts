import { Injectable } from '@nestjs/common'
import { Prisma, type User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(accountId: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { accountId }
    })
  }

  async getOne(id: number, accountId: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id, accountId }
    })
  }

  /** @returns Inserted user */
  async create(user: Omit<User, 'id'>): Promise<User> {
    return await this.prisma.user.create({
      data: user
    })
  }

  /** @returns Updated user, or null if not found */
  async update(id: number, accountId: number, user: Partial<User>): Promise<User | null> {
    delete user.id // Don't update id even if it's passed

    try {
      return await this.prisma.user.update({
        data: user,
        where: { id, accountId }
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        return Promise.resolve(null)
      }
      throw e
    }
  }

  /** @returns Removed user, or null if not found */
  async delete(id: number, accountId: number): Promise<User | null> {
    try {
      return await this.prisma.user.delete({
        where: { id, accountId }
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        return Promise.resolve(null)
      }
      throw e
    }
  }
}
