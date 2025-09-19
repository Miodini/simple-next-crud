'use client'
import styled from 'styled-components'
import Main from '../_components/Main'
import Header from '../_components/Header'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'

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
            <Header
                icon={faHome}
                title='Início'
                subtitle='Projeto CRUD desenvolvido em React.'
            />
            <Main>
                <H2>Bem vindo!</H2>
                <hr/>
                <p className='mb-0'>
                    Este site foi criado para treinamento do autor durante seus estudos em React.
                    Caso esteja vendo esse site a partir do Github Pages, note que não haverá conexão
                    com servidor para o cadastro/recuperação de usuários. Clone e hospede a aplicação
                    disponível <a href='https://github.com/Miodini/projetos-curso-web/tree/main/crud-react'>aqui</a> localmente  .
                </p>
            </Main>
        </>
    )
}