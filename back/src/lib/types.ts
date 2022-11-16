export type User = {
    name: string,
    email: string,
    gender: string,
    phone: string,
}

export type Error = 'NO_ERR' |'CONN_ERR' | 'QUERY_ERR'