import { useIntl } from 'react-intl'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import type { User } from "./types"
import type { GridColDef, GridActionsCellItemProps, GridRowParams } from '@mui/x-data-grid'

export default function UserList ({
  users, handleDelete, handleEdit
}: Readonly<{
  users: User[], handleEdit: (user: User) => void, handleDelete: (userId: number) => void
}>) {
  const { formatMessage } = useIntl()

  function genderValueGetter(gender: string): string {
    switch (gender){
      case 'M':
        return formatMessage({ id: 'users.field.male' })
      case 'F':
        return formatMessage({ id: 'users.field.female' })
      case 'O':
        return formatMessage({ id: 'users.field.other' })
      default:
        return '-'
    }
  }

  function getActions(params: GridRowParams<User>): React.ReactElement<GridActionsCellItemProps>[] {
    return [
      <GridActionsCellItem
        key={1}
        label={formatMessage({ id: 'users.button.edit' })}
        title={formatMessage({ id: 'users.button.edit' })}
        icon={<FontAwesomeIcon icon={faPencil} color='var(--bs-primary)'/>}
        onClick={() => handleEdit(params.row)}
      />,
      <GridActionsCellItem
        key={2}
        label={formatMessage({ id: 'users.button.delete'})}
        title={formatMessage({ id: 'users.button.delete'})}
        icon={<FontAwesomeIcon icon={faTrash} color='var(--bs-danger)' />}
        onClick={() => handleDelete(Number(params.id))}
      />
    ]
  }

  const columns: GridColDef<User>[] = [
    { field: 'name', headerName: formatMessage({ id: 'users.field.name' }), flex: 1 },
    { field: 'email', headerName: formatMessage({ id: 'users.field.mail' }), flex: 1 },
    {
      field: 'gender',
      headerName: formatMessage({ id: 'users.field.gender' }),
      valueGetter: genderValueGetter,
      type: 'singleSelect',
      valueOptions: [formatMessage({ id: 'users.field.male' }), formatMessage({ id: 'users.field.female' }), formatMessage({ id: 'users.field.other' })],
      flex: 0.5
    },
    { field: 'phone', headerName: formatMessage({ id: 'users.field.phone' }), flex: 1 },
    { field: 'actions', type: 'actions', getActions }
  ]

  return (
    <DataGrid
      rows={users}
      columns={columns}
      getRowId={row => row.id}
      sx={{
        fontFamily: 'Montserrat',
        // Removing margin added on p elements by bootstrap
        '& p': {
          margin: 0
        }
      }}
    />
  )
}