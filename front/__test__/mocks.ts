import type { User } from 'firebase/auth'

export const mockUser: User = {
  uid: 'test-uid',
  email: 'test@example.com',
  emailVerified: false,
  displayName: 'Test User',
  providerData: [],
  phoneNumber: null,
  photoURL: 'https://example.com/test.png'
} as unknown as User