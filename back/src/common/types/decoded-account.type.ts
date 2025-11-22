import type { DecodedIdToken } from 'firebase-admin/auth'

// Adds additional field that may be included when using Google auth
export type DecodedAccount = DecodedIdToken & {
  id: number
  name?: string
  email?: string
  picture?: string
}
