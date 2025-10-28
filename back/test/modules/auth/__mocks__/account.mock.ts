import type { Account } from '@prisma/client'

export const account: Readonly<Account> = {
  id: 1,
  uid: 'abcdefg',
  name: 'Admin',
  email: 'admin@email.com'
}
