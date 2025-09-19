'use client'
import { useState, useEffect, useRef } from 'react'

import Registration from './_components/Registration'
import UserList from './_components/UserList'
import ConfMsg from './_components/ConfMsg'
import Confirmation from './_components/Confirmation'
import Api from '@/lib/api'

import type { AlertSettings, User } from './types'
import type { MessageKeys } from '@/lib/i18n'

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
  const timeoutRef = useRef<number>(null)
  
  useEffect(() => {
    fetchUsers().catch(console.error)
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
    try {
      const resp = await Api.del(userToDelete)

      if (resp.status >= 200 && resp.status < 300) {
        configureAlert('delete')
        fetchUsers()
      } else {
        configureAlert('delete', true)
      }
    } catch {
      configureAlert('delete', true)
    }
    setUserToDelete(0)
    setShowDeleteConfirmation(false)
  }

  /** Shows and animates the confirmation message after a put/post/delete
   * @param method Defines which message to show.
   * @param error If set to true, displays an error message instead
   * @param errorCode Error code
   */
  function configureAlert(method: 'put' | 'post' | 'delete', error: boolean = false, errorCode?: number) {
    // Callback to remove the message component from this component's state
    let title: MessageKeys, message: MessageKeys, variant: 'success' | 'danger'

    if (error) {
      title = 'users.error.title'
      variant = 'danger'
    } else {
      title = 'users.success.title'
      variant = 'success'
    }

    if (method === 'post') {
      if (error) {
        if (errorCode === 1) {
          message = 'users.post.errorMessage1'
        } else if (errorCode === 2) {
          message = 'users.post.errorMessage2'
        } else {
          message = 'users.post.errorMessage3'
        }
      } else {
        message = 'users.post.successMessage'
      }
    }
    else if(method === 'put') {
      if (error) {
        if (errorCode === 1) {
          message = 'users.put.errorMessage1'
        } else if(errorCode === 2) {
          message = 'users.put.errorMessage2'
        } else {
          message = 'users.put.errorMessage3'
        }
      } else {
        message = 'users.put.successMessage'
      }
    }
    else {
      if (error) {
        message = 'users.delete.errorMessage1'
      } else {
        message = 'users.delete.successMessage'
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
        onSend={(method, error, errorCode) => {
          configureAlert(method, error, errorCode)
          fetchUsers().catch(console.error)
        }}
      />
      <ConfMsg
        message={alertSettings.message}
        title={alertSettings.title}
        variant={alertSettings.variant}
        show={alertSettings.visible}
      />
      <hr/>
      <UserList
        users={users}
        handleEdit={user => setUser({...user})}
        handleDelete={configDeleteConfirmation}
      />
      <Confirmation
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={deleteUser}
      />
    </>
  )
}