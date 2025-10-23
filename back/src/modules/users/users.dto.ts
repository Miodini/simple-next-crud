import { PartialType, OmitType } from '@nestjs/swagger'
import { IsEmail, IsPositive, IsNumberString, MaxLength, MinLength, IsIn } from 'class-validator'

const genders = ['M', 'F', 'O'] as const

class BaseUserDto {
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
  gender: typeof genders[number]
}

export class GetUserDto extends BaseUserDto {}

export class CreateUserDto extends OmitType(BaseUserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(OmitType(BaseUserDto, ['id'] as const)) {}
