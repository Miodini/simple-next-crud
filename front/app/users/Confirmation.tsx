import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FormattedMessage } from 'react-intl'

export default function Confirmation({
  show, onClose, onConfirm
}: Readonly<{
  show: boolean, onClose: () => void, onConfirm: () => void
}>) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="users.delete.modalTitle"/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormattedMessage id="users.delete.modalContent"/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <FormattedMessage id="users.delete.cancelButton"/>
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <FormattedMessage id="users.delete.deleteButton"/>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}