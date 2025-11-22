import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import * as z from 'zod'
import { render, screen } from '@/__test__/test-utils'
import Phone from '@/app/users/_components/Phone'
 
// Validations tests covered in ./Registration.test.tsx
describe('Phone', () => {
  const value = 'John Doe'
  const user = userEvent.setup()
  const phoneSchema = z.string()
  const onChange = jest.fn()

  it('renders the phone field with provided value', () => {
    render (
      <Phone
        value={value}
        onChange={onChange}
        isValidated={false}
        zodSchema={phoneSchema}
      />
    )
  
    const phoneField = screen.getByRole('textbox')

    expect(phoneField).toBeInTheDocument()
    expect(phoneField).toHaveValue(value)
  })
  it('reacts to user input', async () => {
    render (
      <Phone
        value=""
        onChange={onChange}
        isValidated={false}
        zodSchema={phoneSchema}
      />
    )

    const phoneField = screen.getByRole('textbox')

    await user.type(phoneField, value)
    expect(onChange).toHaveBeenCalled()
  })
})