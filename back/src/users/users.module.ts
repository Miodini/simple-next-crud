import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from '../prisma.service'
import { UniqueEmailPipe } from './pipes/unique-email.pipe'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UniqueEmailPipe]
})
export class UsersModule {}
