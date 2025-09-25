'use client'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { FormattedMessage, useIntl } from 'react-intl'
import * as z from 'zod'

import Name from './Name'
import Email from './Email'
import Gender from './Gender'
import Phone from './Phone'
import Api from '@/lib/api'
import type { User } from '../types'

const blankUser: User = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  phone: '',
}

export default function Registration({
  user, setUser, onSend
}: Readonly<{
  user: User, setUser: React.Dispatch<User>, onSend: (method: 'put' | 'post', error?: boolean, errorCode?: number) => void
}>) {
  const { formatMessage } = useIntl()
  const [isValidated, setIsValidated] = useState<boolean>(false)
  const zodFormSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(formatMessage({ id: 'users.field.mandatory' })),
    email: z.email({ error: iss => formatMessage({ id: iss.input ? 'users.field.invalidEmail' : 'users.field.mandatory'}) }),
    gender: z.enum(['M', 'F', 'O'], formatMessage({ id: 'users.field.mandatory' })),
    phone: z.string()
      .regex(/^\d+$/, { error: iss => formatMessage({ id: iss.input ? 'users.field.invalidPhone' : 'users.field.mandatory'}) })
      .max(15, formatMessage({ id: 'users.field.invalidPhone' }))
  })

  function clear(event?: React.MouseEvent) {
    if(event) {
      event.preventDefault()
    }
    setUser(blankUser)
    setIsValidated(false)
  }

  async function save(event?: React.MouseEvent) {
    if (event) {
      event.preventDefault()
    }

    const parsedUser = zodFormSchema.safeParse(user)

    if (parsedUser.error) {
      setIsValidated(true)
      return
    }

    const method = parsedUser.data.id > 0 ? 'put' : 'post'    // Puts if id is defined (editing user), post otherwise

    try {
      const resp = await (method === 'put' ? Api.put(parsedUser.data) : Api.post(parsedUser.data))
      // Success
      if (resp.status === 201 || resp.status === 204) {
        onSend(method, false)
        clear()
      } else if (resp.data && 'error' in resp.data) {
        // Error
        onSend(method, true, resp.data.error.code)
      }
    }
    catch {
      onSend(method, true)
    }
  }

  function updateInput(field: Exclude<keyof User, 'id'>, value: string) {
    const newUserData: User = {...user}

    newUserData[field] = value
    setUser(newUserData)
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if(event.key === 'Enter') {
      save()
    }
  }

  return(
    <Container fluid className='mb-0'>
      <Form
        role="form"
        noValidate
        onKeyUp={handleKeyPress}
      >
        <Row>
          <Col sm={12} md={6} className='mb-2'>
            <Name
              value={user.name}
              onChange={({ target: { value }}) => updateInput('name', value)}
              isValidated={isValidated}
              zodSchema={zodFormSchema.shape.name}
            />
          </Col>
          <Col sm={12} md={6} className='mb-2'>
            <Email
              value={user.email}
              onChange={({ target: { value }}) => updateInput('email', value)}
              isValidated={isValidated}
              zodSchema={zodFormSchema.shape.email}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} className='mb-2'>
            <Gender 
              value={user.gender}
              onChange={({ target: { value }}) => updateInput('gender', value)}
              isValidated={isValidated}
              zodSchema={zodFormSchema.shape.gender}
            />
          </Col>
          <Col sm={12} md={6} className='mb-2'>
            <Phone 
              value={user.phone}
              onChange={({ target: { value }}) => updateInput('phone', value)}
              isValidated={isValidated}
              zodSchema={zodFormSchema.shape.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" className='float-end' onClick={save}>
              <FormattedMessage id="users.button.submit" />
            </Button>
            <Button variant="secondary" className='float-end mx-1' onClick={clear}>
              <FormattedMessage id="users.button.clear" />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

