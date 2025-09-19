import type { User, Get, Post, Put, Delete } from "./types"

const STORAGE_KEY = 'users'
const ID_LOOKUP_KEY = 'id_lookup'

const get: Get = function() {
    const data = localStorage.getItem(STORAGE_KEY)

    if (data) {
        return Promise.resolve({
            data: JSON.parse(data),
            status: 200
        })
    }

    return Promise.resolve({
        data: [],
        status: 200
    })
}

const post: Post = function(user) {
    let newId: number
    let usersList: User[]
    const lastId = localStorage.getItem(ID_LOOKUP_KEY)
    const data = localStorage.getItem(STORAGE_KEY)
   
    // Keep track of last ID inserted
    if (lastId) {
        newId = Number(lastId) + 1
        localStorage.setItem(ID_LOOKUP_KEY, String(newId))
    } else {
        newId = 1
        localStorage.setItem(ID_LOOKUP_KEY, String(newId))
    } 
    
    if (data) {
        usersList = JSON.parse(data)
    } else {
        usersList = []
    }

    const newUser = {
        ...user,
        id: newId
    }
    usersList.push(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList))
    

    return Promise.resolve({
        data: newUser,
        status: 201
    })
}

const put: Put = function(user) {
    let usersList: User[]
    const data = localStorage.getItem(STORAGE_KEY)

    if (data) {
        usersList = JSON.parse(data)
    } else {
        usersList = []
    }

    const editIndex = usersList.findIndex(user => user.id === user.id)

    if (editIndex >= 0) {
        usersList[editIndex] = { ...user } // Ensure both ids match
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList))
        
        return Promise.resolve({
            data: null,
            status: 204
        })
    } else {
        return Promise.resolve({
            data: null,
            status: 404
        })
    }
}

const del: Delete = function(userId) {
    let usersList: User[]
    const data = localStorage.getItem(STORAGE_KEY)

    if (data) {
        usersList = JSON.parse(data)
    } else {
        usersList = []
    }

    const deleteIndex = usersList.findIndex(user => user.id === userId)

    if (deleteIndex >= 0) {
        usersList.splice(deleteIndex, 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList))
        
        return Promise.resolve({
            data: null,
            status: 204
        })
    } else {
        return Promise.resolve({
            data: null,
            status: 404
        })
    }
}

export { get, post, put, del }