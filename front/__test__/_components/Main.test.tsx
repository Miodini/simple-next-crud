import '@testing-library/jest-dom'
import { render, screen } from '../test-utils'
import Main from '../../app/_components/Main'
 
describe('Main', () => {
  it('renders the main content', () => {
    render(
        <Main>
            <span>Test</span>
        </Main>
    )
 
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})