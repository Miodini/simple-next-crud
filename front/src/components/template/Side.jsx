import React from 'react'
import Logo from './Logo'
import './Side.css'

export default function Side(){
    return(
        <aside className='sidepanel'>
            <Logo/>
            <nav className='menu d-flex flex-column'>
                <a href='#1'>Um</a>
                <a href='#2'>Dois</a>
            </nav>
        </aside>
    )
}