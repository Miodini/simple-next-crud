import '@testing-library/jest-dom'
import { render, screen } from '../test-utils'
import Logo from '../../app/_components/Logo'
 
describe('Logo', () => {
  it('renders the page logo', () => {
    render(<Logo />)
 
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})