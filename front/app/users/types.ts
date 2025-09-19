export type InputPropTypes = Readonly<{
    inputId: string, value: string | number, onChange: React.ChangeEventHandler<HTMLInputElement>
}>

export type User = {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string
}

export type UserListPropTypes = Readonly<{
    isPlaceholder: boolean,
    users: User[],
    handleEdit: (user: User) => void,
    handleDelete: (userId: number) => void
}>