'use client'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import Name from './Name'
import Email from './Email'
import Gender from './Gender'
import Phone from './Phone'
import type { User } from './types'

type ApiResponse = {
    error?: { code: number }
}
const blankUser: User = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    phone: '',
}
const baseURL = 'http://localhost:3001/users'

export default function Registration({
    user, setUser, onSend
}: Readonly<{
    user: User, setUser: React.Dispatch<User>, onSend: (method: 'put' | 'post', error?: boolean, errorCode?: number) => void
}>) {
    // For bootstrap form verification
    const [formClass, setFormClass] = useState<string>('')

    function clear(event?: React.MouseEvent) {
        if(event) {
            event.preventDefault()
        }
        setUser({...blankUser})
        setFormClass('')
    }

    async function save(event?: React.MouseEvent) {
        if(event) {
            event.preventDefault()
        }
        setFormClass('was-validated')
        // If there are no empty fields, save them
        if(!Object.values(user).some(value => value === '')){
            const method = user.id ? 'put' : 'post'    // Puts if id is defined (editing user), post otherwise
            const url = user.id ? baseURL + '/' + user.id : baseURL

            try {
                const resp = await axios[method]<ApiResponse>(url, user)
                // Success
                if(resp.status === 201 || resp.status === 204){
                    onSend(method, false)
                    clear()
                }
                // Error
                else{
                    onSend(method, true, resp.data.error?.code)
                }
            }
            catch {
                onSend(method, true)
            }
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
        <div className='container-fluid mb-0'>
            <form
                className={formClass}
                noValidate
                onKeyUp={handleKeyPress}
            >
                <Row>
                    <Col sm={12} md={6} className='mb-2'>
                        <Name
                            value={user.name}
                            inputId='formName'
                            onChange={({ target: { value }}) => updateInput('name', value)}
                        />
                    </Col>
                    <Col sm={12} md={6} className='mb-2'>
                        <Email
                            value={user.email}
                            inputId='formEmail'
                            onChange={({ target: { value }}) => updateInput('email', value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6} className='mb-2'>
                        <Gender 
                            value={user.gender}
                            inputId='formGender'
                            onChange={({ target: { value }}) => updateInput('gender', value)}
                        />
                    </Col>
                    <Col sm={12} md={6} className='mb-2'>
                        <Phone 
                            value={user.phone}
                            inputId='formPhone'
                            onChange={({ target: { value }}) => updateInput('phone', value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" className='float-end' onClick={save}>
                            Enviar
                        </Button>
                        <Button variant="secondary" className='float-end mx-1' onClick={clear}>
                            Limpar
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

