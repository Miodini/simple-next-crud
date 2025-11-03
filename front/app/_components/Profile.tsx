'use client'
import { forwardRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import blankProfile from '@/public/assets/img/blank-profile.svg'
import useAuthentication from '../_hooks/useAuthentication'
import googleLogo from '@/public/assets/img/google-logo.png'
import { login, logout } from '@/lib/firebase/client'

import type { User } from 'firebase/auth'

type PropType = Readonly<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  displayName?: string
  profilePicture?: string | null
}>

const Frame = styled.button`
  background-color: transparent;
  border: var(--bs-gray) solid 1px;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem;
`
const StyledImage = styled(Image)`
  border-radius: 50%;
`

const ProfileToggle = forwardRef<HTMLButtonElement, PropType>((
  { onClick, profilePicture, displayName }, ref
) => (
    <Frame ref={ref} onClick={onClick}>
      <StyledImage 
          src={profilePicture || blankProfile} 
          alt="Profile Picture" 
          width={50} 
          height={50}
      />
      {displayName || 'User'}
    </Frame>
  )
)

ProfileToggle.displayName = 'ProfileFrame'

export default function Profile () {
  const user: User | null = useAuthentication()

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={ProfileToggle}
        profilePicture={user?.photoURL}
        displayName={user?.displayName?.split(' ')[0]}
      />
      <Dropdown.Menu>
        {user ? (
          <Dropdown.Item onClick={logout}>
            <span className="ms-1">Sign-out</span>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={login}>
            <Image src={googleLogo} alt="Google Logo" height={20}/>
            <span className="ms-1">Sign-in with Google</span>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}