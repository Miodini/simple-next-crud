import {
  Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put
} from '@nestjs/common'
import { UsersService } from './users.service'
import { GetUserDto, CreateUserDto, UpdateUserDto } from './users.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): GetUserDto[] {
    return this.usersService.getAll()
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) param: number): GetUserDto {
    const user = this.usersService.getOne(param)

    if (!user) {
      throw new NotFoundException()
    }
    
    return user
  }
  
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): GetUserDto {
   return this.usersService.create(createUserDto)
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): void {
    const updatedUser = this.usersService.update(id, updateUserDto)

    if (!updatedUser) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = this.usersService.delete(id)

    if (!deletedUser) {
      throw new NotFoundException()
    }
  }
}
