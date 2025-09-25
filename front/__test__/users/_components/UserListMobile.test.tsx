import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import UserListMobile from '../../../app/users/_components/UserListMobile'
import type { User } from '@/app/users/types'

describe('UserListMobile', () => {
  const user = userEvent.setup()
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
  const handleDelete = jest.fn()
  const handleEdit = jest.fn()
  
  beforeEach(() => {
    render (
      <UserListMobile
        users={users}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    )
  })

  it('renders the user names', () => {
    expect(screen.getByText(users[0].name)).toBeInTheDocument()
    expect(screen.getByText(users[1].name)).toBeInTheDocument()
  })
  it('renders the user emails', () => {
    expect(screen.getByText(users[0].email)).toBeInTheDocument()
    expect(screen.getByText(users[1].email)).toBeInTheDocument()
  })
  it('renders the user phone numbers', () => {
    expect(screen.getByText(users[0].phone)).toBeInTheDocument()
    expect(screen.getByText(users[1].phone)).toBeInTheDocument()
  })
  it('renders the user genders', () => {
    expect(screen.getByText('Male')).toBeInTheDocument()
    expect(screen.getByText('Female')).toBeInTheDocument()
  })
  it('clicks on action buttons', async () => {
    const toggleButton = screen.getAllByRole('button')[0]

    await user.click(toggleButton)

    const editButton = screen.getByRole('button', { name: /edit/i })
    const deleteButton = screen.getByRole('button', { name: /delete/i })

    await user.click(editButton)
    expect(handleEdit).toHaveBeenCalled()
    
    await user.click(deleteButton)
    expect(handleDelete).toHaveBeenCalled()
  })
})