import '@testing-library/jest-dom'
import { render, screen } from '../test-utils'
import Page from '../../app/home/page'
 
describe('Home Page', () => {
  it('renders the welcome title', () => {
    render(<Page />)
 
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
  })
})