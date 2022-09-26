import React from 'react'
import Logo from './Logo'
import './Side.css'

export default function Side(){
    return(
        <aside className='sidepanel'>
            <Logo/>
            <nav className='m-2'>
                <p>Um</p>
                <p>Dois</p>
            </nav>
        </aside>
    )
}