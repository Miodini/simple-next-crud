
import Form from "react-bootstrap/Form"
import { FormattedMessage } from "react-intl"
import type { InputPropTypes } from "../types"

export default function Phone ({
  value, onChange, isValidated, zodSchema
}: InputPropTypes) {
  const parsedValue = zodSchema.safeParse(value)

  return (
    <Form.Group>
      <Form.Label htmlFor="phone">
        <FormattedMessage id="users.field.phone" />
      </Form.Label>
      <Form.Control
        value={value}
        onChange={onChange}
        type="tel" 
        id="phone"
        isValid={isValidated && parsedValue.success}
        isInvalid={isValidated && !parsedValue.success}
      />
      {parsedValue.error?.issues.map((issue, i) => (
        <Form.Control.Feedback type="invalid" key={i}>
          {issue.message}
        </Form.Control.Feedback>
      ))}
    </Form.Group>
  )
}