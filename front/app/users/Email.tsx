import Form from "react-bootstrap/Form"
import { FormattedMessage } from "react-intl"
import type { InputPropTypes } from "./types"
/** Renders label and input for email entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Email ({
    inputId, value, onChange
}: InputPropTypes) {
    return(
        <Form.Group>
            <Form.Label htmlFor={inputId}>
                <FormattedMessage id="users.field.mail" />
            </Form.Label>
            <Form.Control 
                value={value}
                id={inputId}
                onChange={onChange}
                type='email' 
                name='email'
                required
            />
            <Form.Control.Feedback type="invalid">
                <FormattedMessage id="users.field.mandatory" />
            </Form.Control.Feedback>
        </Form.Group>
    )
}