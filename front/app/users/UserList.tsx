import Table from 'react-bootstrap/Table'
import { FormattedMessage, useIntl } from 'react-intl'
import type { UserListPropTypes } from "./types"

export default function UserList ({
    isPlaceholder, users, handleDelete, handleEdit
}: UserListPropTypes
) {
    const intl = useIntl()

    function renderTable () {
        return users.map(user => {
            let fullGender
            switch(user.gender){
                case 'M':
                    fullGender = intl.formatMessage({ id: 'users.field.male' })
                    break
                case 'F':
                    fullGender = intl.formatMessage({ id: 'users.field.female' })
                    break
                case 'O':
                    fullGender = intl.formatMessage({ id: 'users.field.other' })
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
                    <th><FormattedMessage id="users.field.name"/></th>
                    <th><FormattedMessage id="users.field.mail"/></th>
                    <th><FormattedMessage id="users.field.gender"/></th>
                    <th><FormattedMessage id="users.field.phone"/></th>
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