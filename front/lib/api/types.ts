import { User } from "@/app/users/types"

type CustomResponse<T> = {
    data: T | ErrorData,
    status: number
}
type ErrorData = {
    error: { code: number }
}
export type Get = () => Promise<CustomResponse<User[]>>
export type Post = (user: Omit<User, 'id'>) => Promise<CustomResponse<User>>
export type Put = (user: User) => Promise<CustomResponse<null>>
export type Delete = (userId: number) => Promise<CustomResponse<null>>

export type { User }