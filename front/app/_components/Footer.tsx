'use client'
import styled from "styled-components"

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Footer() {
    return (
        <Div>
            <a href="https://github.com">GitHub</a>
        </Div>
    )
}