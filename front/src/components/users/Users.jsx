import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Registration from './Registration'
import UserList from './UserList'
import ConfMsg from './ConfMsg'

// Placeholder for the user list table
const blankUserTable = [{
    key: 0,
    name: '-',
    email: '-',
    gender: '-',
    phone: '-'
}]
// Initial state for Registration component
const blankUserForm = {
    name: '',
    email: '',
    gender: '',
    phone: ''
}
const url = 'http://localhost:3001/users'

export default function Users(){
    let [users, setUsers] = useState(blankUserTable)     // For <UserList>
    let [user, setUser] = useState(blankUserForm)        // For <Registration>
    let [isPlaceholder, setPlaceholder] = useState(true)
    let [confMsg, setConfMessage] = useState(null)
    useEffect(() => {
        fetchUsers().catch(console.error)
    }, [])

    /**
     * Gets the users from db and updates the state
     * @returns {Promise}
     */
    async function fetchUsers(){
        try{
            // Render users
            const {data} = await axios(url)
            setUsers(data)
            setPlaceholder(false)            
            return new Promise((resolve, reject) => resolve())
        }
        catch(e){
            // Render placeholder
            setUsers(blankUserTable)
            setPlaceholder(true)
            return new Promise((resolve, reject) => reject(e))
        }
    }

    async function deleteUser(key){
        try{
            const resp = await axios.delete(url + '/' + key)
            if(resp.status === 200){
                renderConfMsg('delete')
                fetchUsers().catch(console.error)
            }
            else
                renderConfMsg('delete', true)
        }
        catch{
            renderConfMsg('delete', true)
        }
    }

    /** Shows and animates the confirmation message after a put/post
     * @param {String} operation Defines which message to show. Shall be 'post', 'put' or 'delete'
     * @param {Boolean} error If set to true, displays an error message instead
     */
    function renderConfMsg(operation, error = false){
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
            if(error)
                msg = 'Não foi possível gravar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            else
                msg = 'Os dados foram gravados com sucesso!'
        }
        else if(operation === 'put'){
            if(error)
                msg = 'Não foi possível atualizar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            else
                msg = 'Usuário atualizado com sucesso!'
        }
        else{
            if(error)
                msg = 'Não foi possível deletar o usuário. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.'
            else
                msg = 'Usuário deletado!'
        }
        setConfMessage(<ConfMsg 
            title = {title}
            msg = {msg}
            color = {color}
            callOnHide={removeComponentCB}/>
        )
    }

    return(
        <Main icon='fa-user'
            title='Cadastro'
            subtitle='Cadastre as pessoas.'
        >
            <Registration 
                user = {user}
                onSend = {(method, error) => {
                    renderConfMsg(method, error)
                    fetchUsers().catch(console.error)
                }}
            />
            {confMsg}
            <hr/>
            <UserList 
                users = {users}
                isPlaceholder = {isPlaceholder}
                handleEdit = {user => setUser({...user})}
                handleDelete = {deleteUser}
            />
        </Main>
    )
}