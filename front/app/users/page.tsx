'use client'
import { useState, useEffect, useRef } from 'react'

import Registration from './_components/Registration'
import UserList from './_components/UserList'
import UserListMobile from './_components/UserListMobile'
import ConfMsg from './_components/ConfMsg'
import Confirmation from './_components/Confirmation'
import Api from '@/lib/api'

import type { AlertSettings, User } from './types'
import { messages, type MessageKeys } from '@/lib/i18n'
import { AxiosError } from 'axios'

// Initial state for Registration component
const blankUserForm: User = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  phone: ''
}
const blankAlertSettings: AlertSettings = {
  title: '',
  message: '',
  variant: '',
  visible: false
}
const ALERT_TIMEOUT = 10000

export default function Users() {
  const [users, setUsers] = useState<User[]>([])     // For <UserList>
  const [user, setUser] = useState<User>(blankUserForm)        // For <Registration>
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(blankAlertSettings)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [userToDelete, setUserToDelete] = useState<number>(0)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const timeoutRef = useRef<number>(null)
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    fetchUsers()
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  /**
   * Gets the users from db and updates the state
   */
  async function fetchUsers() {
    try {
      // Render users if response is not empty
      const { data } = await Api.get()
      
      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        setUsers([])
      }
    }
    catch {
      setUsers([])
    }
  }

  async function deleteUser() {
    setUserToDelete(0)
    setShowDeleteConfirmation(false)

    try {
      await Api.del(userToDelete)

        configureAlert('delete')
        fetchUsers()
    } catch (e) { 
      if (e instanceof AxiosError) {
        if (e.response?.data?.error) {
            configureAlert('delete', e.response.data.error)
        } else {
          configureAlert('delete', 'somethingWentWrong')
        }
      }
    }
  }

  /** Shows and animates the confirmation message after a put/post/delete
   * @param method Defines which message to show.
   * @param error If set to true, displays an error message instead
   * @param errorCode Error code
   */
  function configureAlert(method: 'put' | 'post' | 'delete', error?: string) {
    // Callback to remove the message component from this component's state
    let title: MessageKeys, message: MessageKeys, variant: 'success' | 'danger'

    if (error) {
      title = 'users.error.title'
      variant = 'danger'
      message = `users.errors.${error}` in messages.en ? `users.errors.${error}` as MessageKeys : 'users.errors.somethingWentWrong'
    } else {
      title = 'users.success.title'
      variant = 'success'
      switch (method) {
        case 'delete':
          message = 'users.delete.successMessage'
          break
        case 'post':
          message = 'users.post.successMessage'
          break
        case 'put':
          message = 'users.put.successMessage'
          break
      }
    }

    setAlertSettings({
      title,
      message,
      variant,
      visible: true
    })

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setAlertSettings(prevState => ({ ...prevState, visible: false }))
    }, ALERT_TIMEOUT)
  }

  function configDeleteConfirmation(userId: number) {
    setShowDeleteConfirmation(true)
    setUserToDelete(userId)
  }

  return (
    <>
      <Registration 
        user={user}
        setUser={setUser}
        onSend={(method, error) => {
          configureAlert(method, error)
          fetchUsers()
        }}
      />
      <ConfMsg
        message={alertSettings.message}
        title={alertSettings.title}
        variant={alertSettings.variant}
        show={alertSettings.visible}
      />
      <hr/>
      {screenWidth < 768 ? (
        <UserListMobile
          users={users}
          handleEdit={user => setUser({...user})}
          handleDelete={configDeleteConfirmation}
        />
      ) : (
        <UserList
          users={users}
          handleEdit={user => setUser({...user})}
          handleDelete={configDeleteConfirmation}
        />
      )}
      <Confirmation
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={deleteUser}
      />
    </>
  )
}