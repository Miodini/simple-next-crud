'use client'
import styled from "styled-components"
import { FormattedMessage } from "react-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import type { MessageKeys } from "@/lib/i18n"

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
    Readonly<{ icon: IconDefinition, title: MessageKeys, subtitle: MessageKeys}>
) {
    return (
        <HeaderElement>
            <h1>
                <FontAwesomeIcon icon={icon} size="xs"/>
                <FormattedMessage id={title} />
            </h1>
            <p>
                <FormattedMessage id={subtitle} />
            </p>
        </HeaderElement>
    )
}