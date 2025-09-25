import { FormattedMessage } from 'react-intl'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical'
import type { User } from "../types"

const P = styled.p`
  margin: 0;
`
const Label = styled.span`
  margin-left: 0.5rem;
`
const DetailsWrapper = styled.div`
  flex: 1;
`
const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledDropdownToggle = styled(Dropdown.Toggle)`
  padding: 0.25rem 0.5rem;
  &::after {
    display: none;
  }
`

export default function UserListMobile ({
  users, handleDelete, handleEdit
}: Readonly<{
  users: User[], handleEdit: (user: User) => void, handleDelete: (userId: number) => void
}>) {
  function genderValueGetter(gender: string): React.ReactNode {
    switch (gender){
      case 'M':
        return <FormattedMessage id="users.field.male" />
      case 'F':
        return <FormattedMessage id="users.field.female" />
      case 'O':
        return <FormattedMessage id="users.field.other" />
      default:
        return '-'
    }
  }

  return (
    <ListGroup role="list">
        {users.map(user => (
            <ListGroupItem className="d-flex" key={user.id}>
              <DetailsWrapper>
                <h5>{user.name}</h5>
                <P>{user.email}</P>
                <P>{genderValueGetter(user.gender)}</P>
                <P>{user.phone}</P>
              </DetailsWrapper>
              <ActionsWrapper>
                <Dropdown>
                  <StyledDropdownToggle variant="outline-secondary">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </StyledDropdownToggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(user)}>
                      <FontAwesomeIcon icon={faPencil} color='var(--bs-primary)' />
                      <Label><FormattedMessage id="users.button.edit" /></Label>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(Number(user.id))} >
                      <FontAwesomeIcon icon={faTrash} color='var(--bs-danger)' />
                      <Label><FormattedMessage id="users.button.delete" /></Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ActionsWrapper>
            </ListGroupItem>
        ))}
    </ListGroup>
  )
}