'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useQueryClient } from '@tanstack/react-query'
import { auth } from '@/lib/firebase/client'
import { sync } from './api'
import axios from 'axios'

type AuthContextType = {
  account: User | null
}

const AuthContext = createContext<AuthContextType>({ account: null })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const [account, setAccount] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async account => {
      if (account) {
        try {
          const idToken = await account.getIdToken()

          axios.defaults.headers['Authorization'] = `Bearer ${idToken}`
          await sync() // Upserts the user info in the database
        } catch (e) {
          console.error(e)
        }
      } else {
        delete axios.defaults.headers['Authorization']
      }
      setAccount(account)
    })

    return unsub
  }, [])

  useEffect(() => {
    if (!account) {
      /* Deletes fetched data on user logout
       * Needs to happen after the null `account` is returned by the provider */
      queryClient.resetQueries()
    }
  }, [account, queryClient])

  return (
    <AuthContext.Provider value={{ account }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthentication() {
  return useContext(AuthContext)
}