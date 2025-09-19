'use client'
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'

const CenteredDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export default function Loading() {
    return (
        <CenteredDiv>
            <Spinner />
        </CenteredDiv>
    )
}