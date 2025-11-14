'use client'
import { forwardRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuthentication } from '@/lib/AuthContext'
import { login, logout } from '@/lib/firebase/client'
import blankProfile from '@/public/assets/img/blank-profile.svg'
import googleLogo from '@/public/assets/img/google-logo.png'
import { OPEN_PROFILE_DROPDOWN } from '../_constants/events'

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
          referrerPolicy="no-referrer"
      />
      {displayName || 'User'}
    </Frame>
  )
)

ProfileToggle.displayName = 'ProfileFrame'

export default function Profile () {
  const { account } = useAuthentication()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleOpenDropdown = () => {
      setIsDropdownOpen(true)
    }

    window.addEventListener(OPEN_PROFILE_DROPDOWN, handleOpenDropdown)

    return () => {
      window.removeEventListener(OPEN_PROFILE_DROPDOWN, handleOpenDropdown)
    }
  }, [])

  return (
    <Dropdown show={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <Dropdown.Toggle
        as={ProfileToggle}
        profilePicture={account?.photoURL}
        displayName={account?.displayName?.split(' ')[0]}
      />
      <Dropdown.Menu>
        {account ? (
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