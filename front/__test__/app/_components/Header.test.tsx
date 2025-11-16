import '@testing-library/jest-dom'
import { render, screen } from '@/__test__/test-utils'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import Header from '@/app/_components/Header'
 
describe('Header', () => {
  it('renders the header, with icon, title and content', () => {
    render(
        <Header
            icon={faHome}
            title="home.header.title"
            subtitle="home.header.content"
        />
    )
 
    expect(screen.getByText('Home')).toBeInTheDocument() // Title
    expect(screen.getByText(/Next\.js/i)).toBeInTheDocument() // Subtitle
  })
})