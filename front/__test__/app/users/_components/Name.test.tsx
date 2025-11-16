import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import * as z from 'zod'
import { render, screen } from '@/__test__/test-utils'
import Name from '@/app/users/_components/Name'
 
// Validations tests covered in ./Registration.test.tsx
describe('Name', () => {
  const value = 'John Doe'
  const user = userEvent.setup()
  const nameSchema = z.string()
  const onChange = jest.fn()

  it('renders the name field with provided value', () => {
    render (
      <Name
        value={value}
        onChange={onChange}
        isValidated={false}
        zodSchema={nameSchema}
      />
    )
  
    const nameField = screen.getByRole('textbox')

    expect(nameField).toBeInTheDocument()
    expect(nameField).toHaveValue(value)
  })
  it('reacts to user input', async () => {
    render (
      <Name
        value=""
        onChange={onChange}
        isValidated={false}
        zodSchema={nameSchema}
      />
    )

    const nameField = screen.getByRole('textbox')

    await user.type(nameField, value)
    expect(onChange).toHaveBeenCalled()
  })
})