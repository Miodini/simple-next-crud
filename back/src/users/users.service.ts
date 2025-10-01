import { Injectable } from '@nestjs/common'
import { User } from './users.interfaces'

@Injectable()
export class UsersService {
  private lastId: number = 0
  private readonly users: User[] = []

  getAll(): User[] {
    return this.users
  }

  getOne(id: number): User | null {
    return this.users.find((user) => user.id === id) || null
  }

  /** @returns Inserted user */
  create(user: Omit<User, 'id'>): User {
    const newUser = {
      id: ++this.lastId,
      ...user
    }

    this.users.push(newUser)

    return newUser
  }

  /** @returns Updated user, or null if not found */
  update(id: number, user: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex >= 0) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...user
      }

      return this.users[userIndex]
    }

    return null
  }

  /** @returns Removed user, or null if not found */
  delete(id: number): User | null {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex >= 0) {
      const deletedUser = this.users.splice(userIndex, 1)

      return deletedUser[0]
    }

    return null
  }
}
