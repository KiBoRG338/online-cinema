import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RoomDeleteConfirmModal(props) {
    const { isOpen, onUpdateRoomDeleteConfirmState, onDeleteRoom } = props;
    return (
        <Modal show={isOpen} onHide={onUpdateRoomDeleteConfirmState}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление комнаты</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы точно хотите удалить эту комнату ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onUpdateRoomDeleteConfirmState}>
              Нет
            </Button>
            <Button variant="primary" onClick={onDeleteRoom}>
              Да
            </Button>
          </Modal.Footer>
        </Modal>
      )
}