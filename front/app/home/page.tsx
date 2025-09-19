'use client'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const H2 = styled.h2`
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: .5rem;
`
export default function Home () {
    return(
        <>
            <H2>
                <FormattedMessage id='home.main.title' />
            </H2>
            <hr/>
            <p className='mb-0'>
                <FormattedMessage id='home.main.content' />
            </p>
        </>
    )
}