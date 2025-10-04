import {
  Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put
} from '@nestjs/common'
import { UsersService } from './users.service'
import { GetUserDto, CreateUserDto, UpdateUserDto } from './users.dto'

@Controller('users')
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
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<void> {
    const updatedUser = await this.usersService.update(id, updateUserDto)

    if (!updatedUser) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deletedUser = await this.usersService.delete(id)

    if (!deletedUser) {
      throw new NotFoundException()
    }
  }
}
