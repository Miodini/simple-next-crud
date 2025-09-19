'use client'
import NextLink from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'

const Aside = styled.aside`
    background-color: ${props => props.theme.bg};
    color: white;
    width: 100%;
    box-shadow: ${props => props.theme.shadow};

    @media (min-width: 768px) {
        height: 100%;
        grid-area: sidepanel;
    }
`

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
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (min-width: 768px){
        flex-direction: column;
    }
`

export default function Side () {
    return (
        <Aside>
            <Nav>
                <Link href='/home'>
                    <FontAwesomeIcon icon={faHome} size="xs" />
                    Início
                </Link>
                <Link href='/users'>
                    <FontAwesomeIcon icon={faUsers} size="xs" />
                    Usuários
                </Link>
            </Nav>
        </Aside>
    )
}