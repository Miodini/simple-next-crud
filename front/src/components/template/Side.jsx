import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import './Side.css'

export default function Side(){
    return(
        <aside className='sidepanel'>
            <Logo/>
            <nav className='menu d-flex flex-column'>
                <Link to='/home'>
                    <i className={'m-1 fa fa-home'} />
                    Início
                </Link>
                <Link to='/registration'>
                    <i className={'m-1 fa fa-users'} />
                    Cadastro
                </Link>
            </nav>
        </aside>
    )
}