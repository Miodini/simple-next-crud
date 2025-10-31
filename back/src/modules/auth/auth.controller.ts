import { Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AccountInfo } from '@/common/decorators/account-info.decorator'
import type { DecodedAccount } from '@/common/types/decoded-account.type'

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Must be called after login to create the account in the database if it is not yet created'
  })
  @Post('sync')
  async sync(@AccountInfo() acc: DecodedAccount) {
    await this.authService.sync(acc)
  }
}
