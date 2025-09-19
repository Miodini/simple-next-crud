'use client'
import Image from 'next/image'
import styled, { useTheme } from 'styled-components'

const Aside = styled.aside`
    background-color: ${props => props.theme.bg};
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
        /* Desktop */
        & > img {
            grid-area: logo;
        }
    }
`

export default function Logo () {
    const theme = useTheme()

    return(
        <Aside>
            <Image
                src={'/assets/img/logo.jpg'}
                alt="logo"
                width={theme.asideWidth}
                height={theme.headerHeight}
            />
        </Aside>
    )
}