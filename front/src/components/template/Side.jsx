import React from 'react'
import Logo from './Logo'
import './Side.css'

export default function Side(){
    return(
        <aside className='sidepanel'>
            <Logo/>
            <nav className='menu d-flex flex-column'>
                <a href='#1'>
                    <i className={'m-1 fa fa-home'} />
                    Início
                </a>
                <a href='#2'>
                    <i className={'m-1 fa fa-users'} />
                    Cadastro
                </a>
            </nav>
        </aside>
    )
}