import axios from "axios"
import type { User, Get, Post, Put, Delete} from "./types"

const ENDPOINT = 'http://localhost:3001/users'

const get: Get = async function() {
    const resp = await axios.get<User[]>(ENDPOINT)
    
    return { data: resp.data, status: resp.status }
}

const post: Post = async function(user) {
    const resp = await axios.post<User>(ENDPOINT, user)
    
    return { data: resp.data, status: resp.status }
}

const put: Put = async function(user) {
    const resp = await axios.post<null>(ENDPOINT + `/${user.id}`, user)
    
    return { data: resp.data, status: resp.status }
}

const del: Delete = async function(userId) {
    const resp = await axios.post<null>(ENDPOINT, { id: userId })
    
    return { data: resp.data, status: resp.status }
}

export { get, post, put, del }