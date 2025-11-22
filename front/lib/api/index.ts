import axios from "axios"
import type { User } from "@/app/users/types"

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
const AUTH_ENDPOINT = BASE_ENDPOINT + 'auth/'
const USERS_ENDPOINT = BASE_ENDPOINT + 'users/'

export async function get() {
    const resp = await axios.get<User[]>(USERS_ENDPOINT)
    
    return resp.data
}

export async function post(user: User) {
    const resp = await axios.post<User>(USERS_ENDPOINT, user)
    
    return resp.data
}

export async function put(user: User) {
    const resp = await axios.put<null>(USERS_ENDPOINT + `/${user.id}`, user)
    
    return resp.data
}

export async function del(userId: number) {
    const resp = await axios.delete<null>(USERS_ENDPOINT + `/${userId}`)
    
    return resp.data
}

export async function sync() {
    const resp = await axios.post<null>(AUTH_ENDPOINT + 'sync/')
    
    return resp.data
}