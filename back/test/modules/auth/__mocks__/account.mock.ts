import type { Account } from '@/modules/prisma/generated/client'

export const account: Readonly<Account> = {
  id: 1,
  uid: 'abcdefg',
  name: 'Admin',
  email: 'admin@email.com'
}
