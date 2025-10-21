import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes
} from '@nestjs/common'
import { UsersService } from './users.service'
import { GetUserDto, CreateUserDto, UpdateUserDto } from './users.dto'
import { UniqueEmailPipe } from './pipes/unique-email.pipe'
import { UserValidationPipe } from './pipes/user-validation.pipe'
import { UserNotFoundException } from './exceptions/user-not-found.exception'

@Controller('users')
@UsePipes(UserValidationPipe)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    const user = await this.usersService.getOne(id)

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }

  @Post()
  @UsePipes(UniqueEmailPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    // FIX ME
    return this.usersService.create({ ...createUserDto, accountId: 0 })
  }

  @Put(':id')
  @UsePipes(UniqueEmailPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<void> {
    const updatedUser = await this.usersService.update(id, updateUserDto)

    if (!updatedUser) {
      throw new UserNotFoundException()
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deletedUser = await this.usersService.delete(id)

    if (!deletedUser) {
      throw new UserNotFoundException()
    }
  }
}
