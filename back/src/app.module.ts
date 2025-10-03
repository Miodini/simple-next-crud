import { Module } from '@nestjs/common'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { PrismaService } from './prisma.service'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
