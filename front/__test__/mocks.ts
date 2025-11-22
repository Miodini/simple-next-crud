import type { User as Account } from 'firebase/auth'
import type { User } from '@/app/users/types'

export const mockAccount: Account = {
  uid: 'test-uid',
  email: 'test@example.com',
  emailVerified: false,
  displayName: 'Test User',
  providerData: [],
  phoneNumber: null,
  photoURL: 'https://example.com/test.png'
} as unknown as Account

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@domain.com',
    phone: '123456789',
    gender: 'M'
  },
  {
    id: 2,
    name: 'Mary Smith',
    email: 'mary@domain.com',
    phone: '987654321',
    gender: 'F'
  },
]