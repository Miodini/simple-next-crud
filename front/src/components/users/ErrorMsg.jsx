import React, { useEffect } from 'react'
import { Alert } from 'bootstrap'

export default function ErrorMsg(props){
    const duration = 10000
    useEffect(() =>{
        const alert = new Alert('#error-alert')
        // This is for the bootstrap fade animation
        setTimeout(() => alert.close(), duration)
        // Calls the callback function after the component hid itself
        setTimeout(() => props.callOnHide(), duration + 1000)
    })

    return (
        <div>
            <div className={`alert alert-danger sticky-bottom mt-2 show fade show`} id='error-alert' role='alert'>
                <h3 className='alert-heading'>Erro!</h3>
                <p>Não foi possível gravar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.</p>
            </div>
        </div>
    )
}