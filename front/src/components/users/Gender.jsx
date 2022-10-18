import React from 'react'

/** Renders label and input for gender entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Gender(props){
    return(
        <>
            <label htmlFor={props.inputId} className='form-label'>Sexo</label>
            <select 
                value = {props.value}
                id = {props.inputId}
                onChange = {props.onChange}
                name = 'gender'
                className = 'form-select'
                required
            >
                <option value=''></option>,
                <option value='M'>Masculino</option>,
                <option value='F'>Feminino</option>,
                <option value='O'>Outro</option>
            </select>
            <div className='invalid-feedback'>Preencha este campo.</div>
        </>
    )
}