import React from 'react'
import './Main.css'

export default function Main(props){
    return(
        <main className='main'>
            <div className='p-3'>
                <h2 className='display-4'>{props.title}</h2>
                <hr/>
                {props.children}
            </div>
        </main>
    )
}