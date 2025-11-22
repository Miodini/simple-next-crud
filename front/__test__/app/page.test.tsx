import { render } from '@/__test__/test-utils'
import Page from '@/app/page'

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

import { redirect } from 'next/navigation';

describe('Root Page', () => {
  it('redirects to /home', () => {
    render(<Page />)
    expect(redirect).toHaveBeenCalledWith('/home')
  })
})