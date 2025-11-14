'use client'
import NextLink from 'next/link'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'

const menuHeight = 50 // Mobile

const Link = styled(NextLink)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    vertical-align: middle;
    color: inherit;
    border-left: #fff3 solid 1px;
    border-right: #fff3 solid 1px;

    &:hover {
        background: linear-gradient(135deg, #07a7e3 0%, #32dac3 100%);;
    }

    & > * {
        margin-right: .25rem;
    }

    @media (min-width: 768px){
        height: 40px;
        border-left: none;
        border-right: none;
        border-bottom: #fff3 solid 1px;
    }
`

const Nav = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: ${menuHeight}px;

    @media (min-width: 768px) {
        /* Desktop */
        height: 100%;
        flex-direction: column;
    }
`

export default function Menu() {
    return (
        <Nav>
            <Link href='/home'>
                <FontAwesomeIcon icon={faHome} size="xs" />
                <FormattedMessage id="nav.home"/>
            </Link>
            <Link href='/users'>
                <FontAwesomeIcon icon={faUsers} size="xs" />
                <FormattedMessage id="nav.users"/>
            </Link>
        </Nav>
    )
}