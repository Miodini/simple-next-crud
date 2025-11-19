import '@testing-library/jest-dom'
import { TextEncoder } from 'util'
import * as AuthContextMock from '@/__test__/lib/__mocks__/AuthContext'
import * as ApiMock from '@/__test__/lib/api/__mocks__'
import * as ClientMock from '@/__test__/lib/firebase/__mocks__/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder

// Global mocks
jest.mock('@/lib/AuthContext', () => AuthContextMock)
jest.mock('@/lib/api', () => ApiMock)
jest.mock('@/lib/firebase/client', () => ClientMock)