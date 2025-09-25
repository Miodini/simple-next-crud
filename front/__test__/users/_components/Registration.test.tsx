import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils'
import Registration from '../../../app/users/_components/Registration'
import Api from '../../../lib/api'
import type { User } from '@/app/users/types'

jest.mock('../../../lib/api')

const mockedPost = jest.mocked(Api.post)
const mockedPut = jest.mocked(Api.put)

afterEach(() => {
  jest.clearAllMocks()
})

describe('Registration', () => {
  const user = userEvent.setup()
  const setUser = jest.fn()
  const onSend = jest.fn()

  it('displays user data in the fields', () => {
    const validUser: User = {
      id: 0,
      name: 'John Doe',
      email: 'john@domain.com',
      phone: '123456789',
      gender: 'M'
    }

    render(
      <Registration
        user={validUser}
        setUser={setUser}
        onSend={onSend}
      />
    )

    expect(screen.getByRole('textbox', { name: /name/i})).toHaveValue(validUser.name)
    expect(screen.getByRole('textbox', { name: /e-mail/i})).toHaveValue(validUser.email)
    expect(screen.getByRole('textbox', { name: /phone/i})).toHaveValue(validUser.phone)
    expect(screen.getByRole('combobox', { name: /gender/i})).toHaveValue(validUser.gender)
  })
  describe('Valid Input', () => {
    it('submits valid data for new user', async () => {
      const validUser: User = {
        id: 0,
        name: 'John Doe',
        email: 'john@domain.com',
        phone: '123456789',
        gender: 'M'
      }
  
      render(
        <Registration
          user={validUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      mockedPost.mockReturnValueOnce(Promise.resolve({ data: { ...validUser, id: 1 }, status: 201 }))
      await user.click(submitButton)
      expect(onSend).toHaveBeenCalledWith('post', false)
    })
    it('submits valid data for editing user', async () => {
      const validUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@domain.com',
        phone: '123456789',
        gender: 'M'
      }
  
      render(
        <Registration
          user={validUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      mockedPut.mockReturnValueOnce(Promise.resolve({ data: null, status: 204 }))
      await user.click(submitButton)
      expect(onSend).toHaveBeenCalledWith('put', false)
    })
  })

  describe('Invalid input', () => {
    it('doesn\'t submit invalid name', async () => {
      const invalidUser: User = {
        id: 0,
        name: '',
        email: 'john',
        phone: '123456789',
        gender: 'M'
      }
  
      render(
        <Registration
          user={invalidUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      await user.click(submitButton)
      expect(onSend).not.toHaveBeenCalled()
    })
    it('doesn\'t submit invalid email', async () => {
      const invalidUser: User = {
        id: 0,
        name: 'John Doe',
        email: 'john',
        phone: '123456789',
        gender: 'M'
      }
  
      render(
        <Registration
          user={invalidUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      await user.click(submitButton)
      expect(onSend).not.toHaveBeenCalled()
    })
    it('doesn\'t submit invalid email', async () => {
      const invalidUser: User = {
        id: 0,
        name: 'John Doe',
        email: 'john',
        phone: 'abc',
        gender: 'M'
      }
  
      render(
        <Registration
          user={invalidUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      await user.click(submitButton)
      expect(onSend).not.toHaveBeenCalled()
    })
    it('doesn\'t submit invalid phone', async () => {
      const invalidUser: User = {
        id: 0,
        name: 'John Doe',
        email: 'john@domain.com',
        phone: '123abc4',
        gender: 'M'
      }
  
      render(
        <Registration
          user={invalidUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      await user.click(submitButton)
      expect(onSend).not.toHaveBeenCalled()
    })
    it('doesn\'t submit invalid gender', async () => {
      const invalidUser: User = {
        id: 0,
        name: 'John Doe',
        email: 'john@domain.com',
        phone: '123456789',
        gender: ''
      }
  
      render(
        <Registration
          user={invalidUser}
          setUser={setUser}
          onSend={onSend}
        />
      )
  
      const submitButton = screen.getByRole('button', { name: 'Submit' })
  
      await user.click(submitButton)
      expect(onSend).not.toHaveBeenCalled()
    })
  })
})