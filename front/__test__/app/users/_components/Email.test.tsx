import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import * as z from 'zod'
import { render, screen } from '@/__test__/test-utils'
import Email from '@/app/users/_components/Email'

// Validations tests covered in ./Registration.test.tsx
describe('Email', () => {
  const value = 'test@domain.com'
  const user = userEvent.setup()
  const emailSchema = z.email()
  const onChange = jest.fn()

  it('renders the email field with provided value', () => {
    render (
      <Email
        value={value}
        onChange={onChange}
        isValidated={false}
        zodSchema={emailSchema}
      />
    )
  
    const emailField = screen.getByRole('textbox')

    expect(emailField).toBeInTheDocument()
    expect(emailField).toHaveValue(value)
  })
  it('reacts to user input', async () => {
    render (
      <Email
        value=""
        onChange={onChange}
        isValidated={false}
        zodSchema={emailSchema}
      />
    )

    const emailField = screen.getByRole('textbox')

    await user.type(emailField, value)
    expect(onChange).toHaveBeenCalled()
  })
})