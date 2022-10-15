import React from 'react'
import logo from '../../assets/img/logo.jpg'
import './Logo.css'

export default function Logo(){
    return(
        <aside className='logo'>
            <img src={logo} alt="logo" />
        </aside>
    )
}