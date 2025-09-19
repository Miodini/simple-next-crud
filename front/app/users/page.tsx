'use client'
import React, { useState, useEffect } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import axios from 'axios'

import Main from '../_components/Main'
import Header from '../_components/Header'
import Registration from './Registration'
import UserList from './UserList'
import ConfMsg from './ConfMsg'

import type { User } from './types'

// Placeholder for the user list table
const blankUserTable: User[] = [{
    id: 0,
    name: '-',
    email: '-',
    gender: '-',
    phone: '-'
}] as const
// Initial state for Registration component
const blankUserForm: User = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    phone: ''
} as const
const url = 'http://localhost:3001/users'

export default function Users(){
    const [users, setUsers] = useState<User[]>(blankUserTable)     // For <UserList>
    const [user, setUser] = useState<User>(blankUserForm)        // For <Registration>
    const [isPlaceholder, setPlaceholder] = useState<boolean>(true)
    const [confMsg, setConfMessage] = useState<React.ReactElement | null>(null)
    
    useEffect(() => {
        fetchUsers().catch(console.error)
    }, [])

    /**
     * Gets the users from db and updates the state
     */
    async function fetchUsers(): Promise<void> {
        try{
            // Render users if response is not empty
            const {data} = await axios(url)
            if(data.length > 0){
                setUsers(data)
                setPlaceholder(false)            
            }
            return new Promise<void>((resolve) => resolve())
        }
        catch(e){
            // Render placeholder
            setUsers(blankUserTable)
            setPlaceholder(true)
            return new Promise<void>((_resolve, reject) => reject(e))
        }
    }

    // TODO: deleting multiple users without refreshing doesn't update the table correctly
    async function deleteUser(id: number) {
        try {
            const resp = await axios.delete(url, { data: { id } })

            if (resp.status >= 200 && resp.status < 300){
                renderConfMsg('delete')
                fetchUsers().catch(console.error)
            } else {
                renderConfMsg('delete', true)
            }
        } catch {
            renderConfMsg('delete', true)
        }
    }

    /** Shows and animates the confirmation message after a put/post
     * @param operation Defines which message to show. Shall be 'post', 'put' or 'delete'
     * @param error If set to true, displays an error message instead
     * @param errorCode Error code
     */
    function renderConfMsg(operation: string, error: boolean = false, errorCode?: number){
        // Callback to remove the message component from this component's state
        const removeComponentCB = () => setConfMessage(null)
        let title, msg, color
        if(error){
            title = 'Erro!'
            color = 'danger'
        }
        else{
            title = 'Sucesso!'
            color = 'success'
        }
        if(operation === 'post'){
            if(error){
                if(errorCode === 1)
                    msg = 'E-mail já cadastrado. Utilize outro.'
                else if(errorCode === 2)
                    msg = 'E-mail inválido'
                else
                    msg = 'Não foi possível gravar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            }
            else
                msg = 'Os dados foram gravados com sucesso!'
        }
        else if(operation === 'put'){
            if(error){
                if(errorCode === 1)
                    msg = 'E-mail já cadastrado. Utilize outro.'
                else if(errorCode === 2)
                    msg = 'E-mail inválido.'
                else
                    msg = 'Não foi possível atualizar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            }
            else
                msg = 'Usuário atualizado com sucesso!'
        }
        else{
            if(error)
                msg = 'Não foi possível deletar o usuário. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            else
                msg = 'Usuário deletado!'
        }

        setConfMessage(
            <ConfMsg 
                title={title}
                msg={msg}
                color={color}
                callOnHide={removeComponentCB}
            />
        )
    }

    return (
        <>
            <Header
                icon={faUser}
                title='Cadastro'
                subtitle='Cadastre as pessoas.'
            />
            <Main>
                <Registration 
                    user={user}
                    setUser={setUser}
                    onSend={(method, error, errorCode) => {
                        renderConfMsg(method, error, errorCode)
                        fetchUsers().catch(console.error)
                    }}
                />
                {confMsg}
                <hr/>
                <UserList 
                    users={users}
                    isPlaceholder={isPlaceholder}
                    handleEdit={user => setUser({...user})}
                    handleDelete={deleteUser}
                />
            </Main>
        </>
    )
}