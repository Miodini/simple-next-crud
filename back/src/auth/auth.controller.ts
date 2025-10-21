import { Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AccountInfo } from './decorators/account-info.decorator'
import type { DecodedAccount } from './types/decoded-account.type'

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Must be called after login to create the account in the databse if it is not yet created'
  })
  @Post('sync')
  async sync(@AccountInfo() acc: DecodedAccount) {
    await this.authService.syncUser(acc)
  }
}
