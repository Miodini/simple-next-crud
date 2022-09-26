import React from 'react'
import './Header.css'

export default function Header(props){
    return(
        <header className='header p-3'>
            <h1 className=''>
                <i className={`mx-1 fa ${props.icon}`} />
                {props.title}
            </h1>
            <p className='mt-2'>
                {props.subtitle}
            </p>
        </header>
    )
}