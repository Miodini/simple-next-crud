import React from 'react'
import Main from '../template/Main'
import Header from '../template/Header'

export default function Registration(){
    return(
        <>
            <Header
                icon='fa-home'
                title='Cadastro'
                subtitle='Cadastre as pessoas.'
            />
            <Main title='Bota'>
                <p className='home-p mb-0'>
                    Blabla.
                </p>
            </Main>
        </>
    )
}