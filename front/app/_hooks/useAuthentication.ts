'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export default function useAuthentication(): User | null {
  const [ user, setUser ] = useState<User | null>(null)
    
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, handleAuthStateChanged)

    return unsub
  }, [])

  const handleAuthStateChanged = async (user: User | null) => {
    if (user) {
      try {
        const idToken = await user.getIdToken()
  
        axios.defaults.headers['Authorization'] = `Bearer ${idToken}`
      } catch (e) {
        console.error(e)
      }
    }
    setUser(user)
  }

  return user
}