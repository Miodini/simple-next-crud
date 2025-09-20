import Form from "react-bootstrap/Form"
import { FormattedMessage } from "react-intl"
import type { InputPropTypes } from "../types"

export default function Gender ({
  value, onChange, isValidated, zodSchema
}: InputPropTypes<HTMLSelectElement>) {
  const parsedValue = zodSchema.safeParse(value)

  return (
    <Form.Group>
      <Form.Label htmlFor="gender">
        <FormattedMessage id="users.field.gender" />
      </Form.Label>
      <Form.Select 
        value={value}
        onChange={onChange}
        id="gender"
        isValid={isValidated && parsedValue.success}
        isInvalid={isValidated && !parsedValue.success}
      >
        <option value=''></option>,
        <option value='M'><FormattedMessage id="users.field.male"/></option>,
        <option value='F'><FormattedMessage id="users.field.female"/></option>,
        <option value='O'><FormattedMessage id="users.field.other"/></option>
      </Form.Select>
      {parsedValue.error?.issues.map((issue, i) => (
        <Form.Control.Feedback type="invalid" key={i}>
          {issue.message}
        </Form.Control.Feedback>
      ))}
    </Form.Group>
  )
}