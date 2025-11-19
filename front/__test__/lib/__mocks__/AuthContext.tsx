import { mockAccount } from '@/__test__/mocks'

export function AuthProvider ({ children }: { children: React.ReactNode }){
  return children
}

export function useAuthentication() {
  return { account: mockAccount}
}