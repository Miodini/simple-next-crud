import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import Confirmation from '../../../app/users/_components/Confirmation'
 
describe('Confirmation', () => {
  const user = userEvent.setup()
  const onClose = jest.fn()
  const onConfirm = jest.fn()

  it('renders the confirmation alert', () => {
    render (
      <Confirmation
        show
        onClose={onClose}
        onConfirm={onConfirm}
      />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument() // Modal
    expect(screen.getByText(/Confirmation/)).toBeInTheDocument() // Title
    expect(screen.getByText(/Cancel/)).toBeInTheDocument() // Button
    expect(screen.getByText(/Delete/)).toBeInTheDocument() // Button
  })
  it('is hidden when `show` is false', () => {
    render (
      <Confirmation
        show={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    )

    expect(screen.queryByRole('dialog')).toBeNull()
  })
  it('reacts to user input', async () => {
    render (
      <Confirmation
        show
        onClose={onClose}
        onConfirm={onConfirm}
      />
    )

    const cancelButton = screen.getByText('Cancel')
    const deleteButton = screen.getByText('Delete')

    await user.click(cancelButton)
    expect(onClose).toHaveBeenCalled()

    await user.click(deleteButton)
    expect(onConfirm).toHaveBeenCalled()
  })
})