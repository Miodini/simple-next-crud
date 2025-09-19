import Form from "react-bootstrap/Form"
import { FormattedMessage } from "react-intl"
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
            <Form.Label htmlFor={inputId}>
                <FormattedMessage id="users.field.gender" />
            </Form.Label>
            <Form.Select 
                value={value}
                id={inputId}
                onChange={onChange}
                name='gender'
                required
            >
                <option value=''></option>,
                <option value='M'><FormattedMessage id="users.field.male"/></option>,
                <option value='F'><FormattedMessage id="users.field.female"/></option>,
                <option value='O'><FormattedMessage id="users.field.other"/></option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                <FormattedMessage id="users.field.mandatory" />
            </Form.Control.Feedback>
        </Form.Group>
    )
}