import '@testing-library/jest-dom'
import { render, screen } from '@/__test__/test-utils'
import Footer from '@/app/_components/Footer'
 
describe('Footer', () => {
  it('renders the GitHub logo with navigation', () => {
    render(<Footer />)
 
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', expect.stringMatching(/(https:\/\/)?github.com\/.+$/))
  })
  it('renders the build year', () => {
    render(<Footer />)

    expect(screen.getByText(/\d{4}/)).toBeInTheDocument()
  })
})