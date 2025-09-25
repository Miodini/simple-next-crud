import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import UserList from '../../../app/users/_components/UserList'
import type { User } from '@/app/users/types'

describe('UserList', () => {
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
      <UserList
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
    const editButton = screen.getAllByRole('menuitem', { name: /edit/i })[0]
    const deleteButton = screen.getAllByRole('menuitem', { name: /delete/i })[0]

    await user.click(editButton)
    expect(handleEdit).toHaveBeenCalled()
    
    await user.click(deleteButton)
    expect(handleDelete).toHaveBeenCalled()
  })
})