import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { Request } from '../types/request.type'

export const AccountInfo = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()

    return request.account
  }
)
