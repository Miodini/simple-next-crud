import '@testing-library/jest-dom'
import { render, screen } from '../test-utils'
import Menu from '../../app/_components/Menu'
 
describe('Menu', () => {
  it('renders the navigation menu', () => {
    render(<Menu />)

    const links = screen.getAllByRole('link')

    links.forEach(link => {
        expect(link).toHaveAttribute('href')
    })
  })
})