import Form from "react-bootstrap/Form"
import React from 'react'

/** Renders label and input for gender entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Gender ({
    inputId, value, onChange
}: Readonly<
    { inputId: string, value: string | number, onChange: React.ChangeEventHandler<HTMLSelectElement>}
>) {
    return(
        <Form.Group>
            <Form.Label htmlFor={inputId}>Sexo</Form.Label>
            <Form.Select 
                value={value}
                id={inputId}
                onChange={onChange}
                name='gender'
                required
            >
                <option value=''></option>,
                <option value='M'>Masculino</option>,
                <option value='F'>Feminino</option>,
                <option value='O'>Outro</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Preencha este campo.</Form.Control.Feedback>
        </Form.Group>
    )
}