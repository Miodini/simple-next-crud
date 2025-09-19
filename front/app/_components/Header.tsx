'use client'
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const HeaderElement = styled.header`
    box-shadow: ${props => props.theme.shadow};
    padding: 1rem;

    & > h1 {
        margin: 0;
        font-size: 1.8em;
        font-weight: 400;
    }
    & > p {
        margin-top: .5rem;
    }
    @media (min-width: 768px){
        grid-area: header;
    }
`

export default function Header (
    { icon, title, subtitle }:
    Readonly<{ icon: IconDefinition, title: string, subtitle: string}>
) {
    return (
        <HeaderElement>
            <h1>
                <FontAwesomeIcon icon={icon} size="xs"/>
                {title}
            </h1>
            <p>
                {subtitle}
            </p>
        </HeaderElement>
    )
}