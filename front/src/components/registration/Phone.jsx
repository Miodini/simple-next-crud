import React from 'react'

/** Renders label and input for phone entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Phone(props){
    const isSpecialKey = function(key){
        // Is there a better way?
        return key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End'
    }

    const enforceNumber = function(event){
        // Only allows numbers and some navigation/edition key
        if(!( '1234567890'.includes(event.key) || isSpecialKey(event.key) ))
            event.preventDefault()
    }
    
    return (
        <>
            <label htmlFor={props.inputId} className='form-label'>Telefone</label>
            <input 
                value = {props.value}
                id = {props.inputId}
                onChange = {props.onChange}
                type='tel' 
                name = 'phone'
                className = 'form-control'
                maxLength = {11}
                onKeyDown={e => enforceNumber(e)}
                placeholder = 'Apenas números'
                required
            />
            <div className='invalid-feedback'>Preencha este campo.</div>
        </>
    )
}