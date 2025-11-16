import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, fireEvent, screen, waitFor, within } from '@/__test__/test-utils'
import Page from '@/app/users/page'
import * as Api from '@/lib/api'
import type { User } from '@/app/users/types'

jest.mock('@/lib/api')

const mockedGet = jest.mocked(Api.get)
const mockedPost = jest.mocked(Api.post)
const mockedPut = jest.mocked(Api.put)
const mockedDel = jest.mocked(Api.del)
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@domain.com',
    phone: '123456789',
    gender: 'M'
  },
  {
    id: 2,
    name: 'Mary Smith',
    email: 'mary@domain.com',
    phone: '987654321',
    gender: 'F'
  },
]

mockedGet.mockResolvedValue({ data: users, status: 200 })

// Validations tests covered in ./Registration.test.tsx
describe('Page', () => {
  const user = userEvent.setup()
  let nameInput: HTMLElement, emailInput: HTMLElement, phoneInput: HTMLElement, genderInput: HTMLElement, submitButton: HTMLElement
  
  afterEach(() => {
    jest.clearAllMocks()
    window.innerWidth = 1920
  })

  beforeEach(async () => {
    render(<Page />)

    nameInput = screen.getByRole('textbox', { name: /name/i})
    emailInput = screen.getByRole('textbox', { name: /e-mail/i})
    phoneInput = screen.getByRole('textbox', { name: /phone/i})
    genderInput = screen.getByRole('combobox', { name: /gender/i})
    submitButton = screen.getByRole('button', { name: /submit/i})
    
    await waitFor(() => {
      // Waits for data to settle before testing
      expect(mockedGet).toHaveBeenCalled()
    })
  })

  it('renders the form and the table/list', () => {
    const table = screen.getAllByRole('presentation')[0]
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(table).toBeInTheDocument() // Table
    
    window.innerWidth = 500
    fireEvent(window, new Event('resize'))
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument() // Mobile list view
  })
  it('gets user data and displays it', async () => {
    expect(mockedGet).toHaveBeenCalled()

    await screen.findByText(users[0].name)
    expect(screen.getByText(users[0].name)).toBeInTheDocument()
    expect(screen.getByText(users[1].name)).toBeInTheDocument()
  })
  it('clears form input', async () => {
      const newUser: User = {
        id: 0,
        name: 'Rin Hoshizora',
        email: 'rin@mail.com',
        phone: '1231241',
        gender: 'F'
      }
      await user.type(nameInput, newUser.name)
      await user.type(emailInput, newUser.email)
      await user.type(phoneInput, newUser.phone)
      await user.selectOptions(genderInput, newUser.gender)
      await user.click(screen.getByRole('button', { name: /clear/i }))

      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(phoneInput).toHaveValue('')
      expect(genderInput).toHaveValue('')
    })
  it('creates a new user', async () => {
    const newUser: User = {
      id: 0,
      name: 'Rin Hoshizora',
      email: 'rin@mail.com',
      phone: '1231241',
      gender: 'F'
    }

    await user.type(nameInput, newUser.name)
    await user.type(emailInput, newUser.email)
    await user.type(phoneInput, newUser.phone)
    await user.selectOptions(genderInput, newUser.gender)
    await user.click(submitButton)

    expect(mockedPost).toHaveBeenCalled()
    expect(screen.getByRole('alert')).toBeInTheDocument() // Shows the confirmation alert
    expect(mockedGet).toHaveBeenCalledTimes(2)
  })
  it('edits a user', async () => {
    const editButton = (await screen.findAllByRole('menuitem', { name: /edit/i }))[0]

    await user.click(editButton)
    expect(nameInput).toHaveValue(users[0].name)

    await user.clear(nameInput)
    await user.type(nameInput, 'Rin Hoshizora')
    await user.click(submitButton)
    expect(mockedPut).toHaveBeenCalled()
  })
  it('deletes a user', async () => {
    const deleteButton = (await screen.findAllByRole('menuitem', { name: /delete/i }))[0]
    await user.click(deleteButton)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    const confirmButton = within(dialog).getByRole('button', { name: /delete/i })
    await user.click(confirmButton)
    expect(mockedDel).toHaveBeenCalled()
  })
})