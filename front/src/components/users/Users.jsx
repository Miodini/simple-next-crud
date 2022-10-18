import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Registration from './Registration'
import UserList from './UserList'

const blankUser = [{
    key: 0,
    name: '-',
    email: '-',
    gender: '-',
    phone: '-'
}]
const url = 'http://localhost:3001/users'

export default function Users(){
    let [users, updateUsers] = useState(blankUser)
    useEffect(() => {
        fetchUsers()
    }, [])

    /**
     * Gets the users from db and updates the state
     * @returns {Promise}
     */
    async function fetchUsers(){
        try{
            const {data} = await axios(url)
            updateUsers(data)            
            return new Promise((resolve, reject) => resolve())
        }
        catch(e){
            updateUsers(blankUser)
            return new Promise((resolve, reject) => reject(e))
        }
    }

    async function editUser(key){
        
    }

    async function deleteUser(key){
        try{
            const resp = await axios.delete(url + '/' + key)
            if(resp.status === 200){
                fetchUsers().catch(console.error)
            }
        }
        catch{

        }
    }

    return(
        <Main icon='fa-user'
            title='Cadastro'
            subtitle='Cadastre as pessoas.'
        >
            <Registration/>
            <hr/>
            <UserList 
                users = {users}
                handleDelete = {deleteUser}
            />
        </Main>
    )
}