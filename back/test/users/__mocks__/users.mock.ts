import { User } from '@prisma/client'

export const users: Readonly<User>[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '123456789',
    gender: 'M'
  },
  {
    id: 2,
    name: 'Mary Smith',
    email: 'marysmith@email.com',
    phone: '987654321',
    gender: 'F'
  }
]
