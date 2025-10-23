import type { Request as ExpressRequest } from 'express'
import type { DecodedAccount } from './decoded-account.type'

/** `account` is injected in all requests via the global AuthGuard guard */
export type Request = ExpressRequest & { account: DecodedAccount }
