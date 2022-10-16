import React, {useEffect} from 'react'
import { Alert } from 'bootstrap'

export default function SuccessMsg(props){
    const duration = 10000
    useEffect(() =>{
        const alert = new Alert('#success-alert')
        // This is for the bootstrap fade animation
        setTimeout(() => alert.close(), duration)
        // Calls the callback function after the component hid itself
        setTimeout(() => props.callOnHide(), duration + 1000)
    })
    
    return (
        <div>
            <div className={`alert alert-success sticky-bottom mt-2 fade show`} id='success-alert' role='alert'>
                <h3 className='alert-heading'>Sucesso!</h3>
                <p>Os dados foram gravados com sucesso.</p>
            </div>
        </div>
    )
}