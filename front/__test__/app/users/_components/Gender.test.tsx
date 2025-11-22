import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import * as z from 'zod'
import { render, screen } from '@/__test__/test-utils'
import Gender from '@/app/users/_components/Gender'
 
// Validations tests covered in ./Registration.test.tsx
describe('Gender', () => {
  const value = 'F'
  const user = userEvent.setup()
  const genderSchema = z.string()
  const onChange = jest.fn()

  it('renders the gender field with provided value', () => {
    render (
      <Gender
        value={value}
        onChange={onChange}
        isValidated={false}
        zodSchema={genderSchema}
      />
    )
  
    const genderField = screen.getByRole('combobox')

    expect(genderField).toBeInTheDocument()
    expect(genderField).toHaveValue(value)
  })
  it('reacts to user input', async () => {
    render (
      <Gender
        value=""
        onChange={onChange}
        isValidated={false}
        zodSchema={genderSchema}
      />
    )

    const genderField = screen.getByRole('combobox')

    await user.selectOptions(genderField, 'F')
    expect(onChange).toHaveBeenCalled()
  })
})