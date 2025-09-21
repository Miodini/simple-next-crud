import '@testing-library/jest-dom'
import { render, screen } from '../test-utils'
import Page from '../../app/home/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
  })
})