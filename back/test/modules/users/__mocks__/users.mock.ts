import { account } from '../../auth/__mocks__/account.mock'
import type { User } from '@prisma/client'

export const users: Readonly<User>[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '123456789',
    gender: 'M',
    accountId: account.id
  },
  {
    id: 2,
    name: 'Mary Smith',
    email: 'marysmith@email.com',
    phone: '987654321',
    gender: 'F',
    accountId: account.id
  }
]
