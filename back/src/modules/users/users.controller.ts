import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { GetUserDto, CreateUserDto, UpdateUserDto } from './users.dto'
import { UniqueEmailPipe } from './pipes/unique-email.pipe'
import { UserValidationPipe } from './pipes/user-validation.pipe'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { AccountId } from '@/common/decorators/account-id.decorator'
import { AuthGuard } from '@/modules/auth/auth.guard'

@ApiBearerAuth()
@Controller('users')
@UsePipes(UserValidationPipe)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
    @AccountId() accountId: number
  ): Promise<GetUserDto> {
    const user = await this.usersService.getOne(id, accountId)

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }

  @Post()
  @UsePipes(UniqueEmailPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @AccountId() accountId: number
  ): Promise<GetUserDto> {
    return this.usersService.create({ ...createUserDto, accountId })
  }

  @Put(':id')
  @UsePipes(UniqueEmailPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @AccountId() accountId: number
  ): Promise<void> {
    const updatedUser = await this.usersService.update(id, accountId, updateUserDto)

    if (!updatedUser) {
      throw new UserNotFoundException()
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @AccountId() accountId: number
  ): Promise<void> {
    const deletedUser = await this.usersService.delete(id, accountId)

    if (!deletedUser) {
      throw new UserNotFoundException()
    }
  }
}
