import '@testing-library/jest-dom'
import { render, screen } from '@/__test__/test-utils'
import Logo from '@/app/_components/Logo'
 
describe('Logo', () => {
  it('renders the page logo', () => {
    render(<Logo />)
 
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})