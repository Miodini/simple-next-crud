import { PartialType, OmitType } from '@nestjs/swagger'
import { IsEmail, IsPositive, IsNumberString, MaxLength, MinLength, IsIn } from 'class-validator'
import type { User } from './users.interfaces'

const genders: Array<User['gender']> = ['M', 'F', 'O']

class BaseUserDto implements User {
  @IsPositive()
  id: number

  @MinLength(1)
  name: string

  @IsEmail()
  email: string

  @IsNumberString()
  @MinLength(3)
  @MaxLength(15)
  phone: string

  @IsIn(genders)
  gender: 'M' | 'F' | 'O'
}

export class GetUserDto extends BaseUserDto {}

export class CreateUserDto extends OmitType(BaseUserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}