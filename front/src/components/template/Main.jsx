import React from 'react'
import Header from './Header'
import './Main.css'

export default function Main(props){
    return(
        <>
            <Header {...props}/>
            <main className='main'>
                <div className='p-3'>
                    {props.children}
                </div>
            </main>
        </>
    )
}