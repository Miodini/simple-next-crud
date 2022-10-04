import React from 'react'
import Main from '../template/Main'
import Header from '../template/Header'

export default function Home(){
    return(
        <>
            <Header
                icon='fa-home'
                title='Início'
                subtitle='Projeto CRUD desenvolvido em React.'
            />
            <Main title='Bem vindo!'>
                <p className='home-p mb-0'>
                    Este site foi criado para treinamento do autor durante seus estudos em React.
                    Caso esteja vendo esse site a partir do Github Pages, note que não haverá conexão
                    com servidor para o cadastro/recuperação de usuários. Clone e hospede a aplicação
                    disponível <a href='/#'>aqui</a> localmente  .
                </p>
            </Main>
        </>
    )
}