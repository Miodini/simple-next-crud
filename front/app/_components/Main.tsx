'use client'
import styled from "styled-components"

const MainElement = styled.main`
    margin: 10px;
    & > div {
        box-shadow: 0px 0px 15px #0004;
        padding: 1rem;
    }
`

export default function Main(
    { children }:
    Readonly<{ children: React.ReactNode}>
) {
    return (
        <MainElement>
            <div>
                {children}
            </div>
        </MainElement>
    )
}