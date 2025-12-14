import {
  Injectable, Inject, Scope, PipeTransform
} from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import type { Request } from 'express'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto, UpdateUserDto } from '../users.dto'
import { DuplicateEmailExpection } from '../exceptions/duplicate-email.exception'

/**
 * Validates the incoming request `email` field.
 * Requests should not create a new user if the same email is already registered.
 * If the request is an update operation, then updating the user with the same email address should be allowed.
 * @throws {DuplicateEmailExpection}
 */
@Injectable({ scope: Scope.REQUEST })
export class UniqueEmailPipe<T extends CreateUserDto | UpdateUserDto> implements PipeTransform<T, Promise<T>> {
  constructor(
    private prismaService: PrismaService,
    @Inject(REQUEST) private request: Request<{ id?: string }>
  ) {}

  async transform(value: T): Promise<T> {
    // Only validate if value is CreateUserDto or UpdateUserDto
    const email = value.email

    if (!email) return value
    const id = this.request.params.id
    const where: Prisma.UserWhereInput = { email }

    if (id) {
      where.NOT = { id: Number(id) }
    }
    const user = await this.prismaService.user.findFirst({ where })

    if (user) {
      throw new DuplicateEmailExpection()
    }
    return value
  }
}
