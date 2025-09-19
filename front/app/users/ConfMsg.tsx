'use client'
import React, { useEffect } from 'react'
import { Alert } from 'bootstrap'

export default function ConfMsg (
    { callOnHide, color, msg, title }:
    Readonly<{
        callOnHide: () => void, color: string, msg: string, title: string
    }>
) {
    const duration = 10000
    useEffect(() =>{
        const alert = new Alert('#success-alert')
        // This is for the bootstrap fade animation
        setTimeout(() => alert.close(), duration)
        // Calls the callback function after the component hid itself
        setTimeout(() => callOnHide(), duration + 1000)
    })
    
    return (
        <div className='sticky-bottom '>
            <div className={`alert alert-${color} mt-2 fade show`} id='success-alert' role='alert'>
                <h3 className='alert-heading'>{title}</h3>
                <p>{msg}</p>
            </div>
        </div>
    )
}