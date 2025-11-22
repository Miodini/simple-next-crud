import '@testing-library/jest-dom'
import { render, screen } from '@/__test__/test-utils'
import Profile from '@/app/_components/Profile'
import { mockAccount } from '@/__test__/mocks'

describe('Footer', () => {
  it('renders the Profile menu', () => {
    render(<Profile />)
 
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(mockAccount.displayName!.split(' ')[0])).toBeInTheDocument()
  })
})