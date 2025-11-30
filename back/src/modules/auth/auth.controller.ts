import { BadRequestException, Controller, Req, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { auth } from 'firebase-admin'
import type { DecodedAccount } from '@/common/types/decoded-account.type'
import type { Request } from '@/common/types/request.type'

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Must be called after login to create the account in the database if it is not yet created'
  })
  @Post('sync')
  async sync(@Req() request: Request) {
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new BadRequestException()
    try {
      const account = await auth().verifyIdToken(token)

      await this.authService.sync(account as DecodedAccount)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    return type === 'Bearer' ? token : undefined
  }
}
