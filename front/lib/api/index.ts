import axios from "axios"
import type { User } from "@/app/users/types"

const ENDPOINT = 'http://localhost:3001/users'

export async function get() {
    const resp = await axios.get<User[]>(ENDPOINT)
    
    return resp.data
}

export async function post(user: User) {
    const resp = await axios.post<User>(ENDPOINT, user)
    
    return resp.data
}

export async function put(user: User) {
    const resp = await axios.put<null>(ENDPOINT + `/${user.id}`, user)
    
    return resp.data
}

export async function del(userId: number) {
    const resp = await axios.delete<null>(ENDPOINT + `/${userId}`)
    
    return resp.data
}
