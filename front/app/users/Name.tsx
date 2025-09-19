import Form from "react-bootstrap/Form"
import type { InputPropTypes } from "./types"

/** Renders label and input for name entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Email ({
    inputId, value, onChange
}: InputPropTypes) {
    return(
        <Form.Group>
            <Form.Label htmlFor={inputId}>Nome</Form.Label>
            <Form.Control 
                value={value}
                id={inputId}
                onChange={onChange}
                type='text' 
                name='name'
                required
            />
            <Form.Control.Feedback type="invalid">Preencha este campo.</Form.Control.Feedback>
        </Form.Group>
    )
}