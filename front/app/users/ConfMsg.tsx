'use client'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Alert } from 'bootstrap'
import type { MessageKeys } from '@/lib/i18n'

export default function ConfMsg (
    { callOnHide, color, msg, title }:
    Readonly<{
        callOnHide: () => void, color: string, msg: MessageKeys, title: MessageKeys
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
                <h3 className='alert-heading'>
                    <FormattedMessage id={title} />
                </h3>
                <p>
                    <FormattedMessage id={msg} />
                </p>
            </div>
        </div>
    )
}