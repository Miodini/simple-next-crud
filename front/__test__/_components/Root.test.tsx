import '@testing-library/jest-dom'
import { render, screen, within } from '../test-utils'
import Root from '../../app/_components/Root'

jest.mock('next/navigation', () => ({
    usePathname: jest.fn()
}))

import { usePathname } from 'next/navigation'
 
describe('Root', () => {
  it('renders the home page', async () => {
    (usePathname as jest.Mock).mockReturnValue('/home')
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
  it('renders the home page', async () => {
    (usePathname as jest.Mock).mockReturnValue('/users')
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