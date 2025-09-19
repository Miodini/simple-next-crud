import type { UserListPropTypes } from "./types"
import Table from 'react-bootstrap/Table'

export default function UserList ({
    isPlaceholder, users, handleDelete, handleEdit
}: UserListPropTypes) {
    function renderTable () {
        return users.map(user => {
            let fullGender
            switch(user.gender){
                case 'M':
                    fullGender = 'Masculino'
                    break
                case 'F':
                    fullGender = 'Feminino'
                    break
                case 'O':
                    fullGender = 'Outro'
                    break
                default:
                    fullGender = '-'
            }
            const buttons = () => {
                if(!isPlaceholder) 
                    return(    
                        <>
                            <td>
                                <button className='btn btn-primary' onClick = {() => handleEdit(user)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick = {() => handleDelete(user.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </>
                    )
                else return null
            }
            return(
                // When rendering a placeholder, there's only one tr and no user, so setting it to 1 should be fine
                <tr key={user.id || 1}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{fullGender}</td>
                    <td>{user.phone}</td>
                    {buttons()}
                </tr>
            )
        })  
    }

    return(
        <Table striped>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Sexo</th>
                    <th>Telefone</th>
                    <th>{/* Edit */}</th>
                    <th>{/* Delete */}</th>
                </tr>
            </thead>
            <tbody>
                {renderTable()}
            </tbody>
        </Table>
    )
    
}