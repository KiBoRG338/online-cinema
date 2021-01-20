import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RoomLeaveConfirmModal(props) {
    const { isOpen, onUpdateRoomLeaveConfirmState, onLeaveFromRoom } = props;
    return (
        <Modal show={isOpen} onHide={onUpdateRoomLeaveConfirmState}>
          <Modal.Header closeButton>
            <Modal.Title>Выход из комнаты</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите выйти из данной комнаты ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onUpdateRoomLeaveConfirmState}>
              Нет
            </Button>
            <Button variant="primary" onClick={onLeaveFromRoom}>
              Да
            </Button>
          </Modal.Footer>
        </Modal>
      )
}