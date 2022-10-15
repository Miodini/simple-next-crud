import React from 'react'
import { Link } from 'react-router-dom'
import './Side.css'

export default function Side(){
    return(
        <aside className='sidepanel'>
            <nav className='menu'>
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