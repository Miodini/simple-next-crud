import React from 'react'

export default function UserList(props){
    function renderTable(){
        return props.users.map(user => {
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
            return(
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{fullGender}</td>
                    <td>{user.phone}</td>
                    <td>
                        <button className='btn btn-primary' onClick = {() => props.handleEdit(user.id)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick = {() => props.handleDelete(user.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })  
    }

    return(
        <table className="table table-stripped">
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
        </table>
    )
    
}