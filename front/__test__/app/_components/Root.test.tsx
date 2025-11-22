import '@testing-library/jest-dom'
import { render, screen, within } from '@/__test__/test-utils'
import Root from '@/app/_components/Root'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
    usePathname: jest.fn()
}))

describe('Root', () => {
  it('renders the home page', async () => {
    jest.mocked(usePathname).mockReturnValue('/home')
    render(
      <Root>
        <span>Test</span>
      </Root>
    )
 
    // Act
    await screen.findAllByText(/test/i)

    const header = screen.getByRole('banner')
    const main = screen.getByRole('main')
    // Assert
    expect(within(header).getByText(/home/i)).toBeInTheDocument()
    expect(within(main).getByText(/test/i)).toBeInTheDocument()
  })
  it('renders the users page', async () => {
    jest.mocked(usePathname).mockReturnValue('/users')
    render(
      <Root>
        <span>Test</span>
      </Root>
    )
 
    // Act
    await screen.findAllByText(/test/i)

    const header = screen.getByRole('banner')
    const main = screen.getByRole('main')
    // Assert
    expect(within(header).getByText(/registration/i)).toBeInTheDocument()
    expect(within(main).getByText(/test/i)).toBeInTheDocument()
  })
})