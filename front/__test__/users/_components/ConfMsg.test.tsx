import '@testing-library/jest-dom'
import { render, screen } from '../../test-utils'
import ConfMsg from '../../../app/users/_components/ConfMsg'
 
describe('ConfMsg', () => {
  const variant = 'primary'
  const title = 'users.success.title'
  const message = 'users.post.successMessage'

  it('renders the confirmation alert', () => {
    render (
      <ConfMsg
        show
        variant={variant}
        title={title}
        message={message}
      />
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/Success/)).toBeInTheDocument()
  })
  it('is hidden when `show` is false', () => {
    render (
        <ConfMsg
            show={false}
            variant={variant}
            title={title}
            message={message}
        />
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })
})