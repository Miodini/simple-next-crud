
import Form from "react-bootstrap/Form"
import { FormattedMessage, useIntl } from "react-intl"
import type { InputPropTypes } from "./types"

/** Renders label and input for phone entry
 * @props value - The value to be displayed
 * @props inputId - Standard HTML id
 * @props onChange - onChange handler function
*/
export default function Phone ({
    inputId, value, onChange
}: InputPropTypes) {
    const intl = useIntl()

    const isSpecialKey = (key: string) => {
        // Is there a better way?
        return key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End'
    }

    const enforceNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Only allows numbers and some navigation/edition key
        if(!( '1234567890'.includes(event.key) || isSpecialKey(event.key) )) {
            event.preventDefault()
        }
    }
    
    return (
        <Form.Group>
            <Form.Label htmlFor={inputId}>
                <FormattedMessage id="users.field.phone" />
            </Form.Label>
            <Form.Control
                value={value}
                id={inputId}
                onChange={onChange}
                type='tel' 
                name='phone'
                maxLength={11}
                onKeyDown={enforceNumber}
                placeholder={intl.formatMessage({ id: 'users.field.phonePlaceholder' })}
                required
            />
           <Form.Control.Feedback type="invalid">
                <FormattedMessage id="users.field.mandatory" />
            </Form.Control.Feedback>
        </Form.Group>
    )
}