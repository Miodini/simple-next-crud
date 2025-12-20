import type { DecodedAccount } from 'src/common/types/decoded-account.type'

export const decodedAccount: DecodedAccount = {
  aud: 'abc',
  auth_time: 999,
  exp: 999,
  firebase: {
    identities: {},
    sign_in_provider: 'abc'
  },
  iat: 999,
  id: 1,
  iss: 'mock@mock.com',
  sub: 'abc',
  uid: 'abc',
  name: 'Admin',
  email: 'admin@email.com',
  email_verified: false,
  phone_number: '1234',
  picture: 'https://example.com/photo.jpg'
}
