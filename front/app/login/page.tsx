'use client'
import useAuthentication from '../_hooks/useAuthentication'
import { GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export default function Home () {
  const user: User | null = useAuthentication()

  const login = async () => {
    const provider = new GoogleAuthProvider()
    await setPersistence(auth, browserLocalPersistence)

    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      console.error(e)
    }
  }
  
  const logout = async () => {
    await signOut(auth)
  }

  if (user) {
    return (
      <div>
        <p>Welcome {user.displayName}</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
  return (
    <button onClick={login}>Loga aí</button>
  )
}