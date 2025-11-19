import { mockUsers } from '@/__test__/mocks'
import type { User } from '@/app/users/types'

export const get = jest.fn().mockResolvedValue(mockUsers)

export const post = jest.fn().mockImplementation((user: User) => 
  Promise.resolve({
    ...user,
    id: mockUsers.length + 1
  })
)

export const put = jest.fn().mockResolvedValue(null)

export const del = jest.fn().mockResolvedValue(null)
