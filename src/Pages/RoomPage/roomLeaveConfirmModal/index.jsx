import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RoomLeaveConfirmModal(props) {
    const { isOpen, onUpdateRoomLeaveConfirmState, onLeaveFromRoom } = props;
    return (
        <Modal show={isOpen} onHide={onUpdateRoomLeaveConfirmState}>
          <Modal.Header closeButton>
            <Modal.Title>Exiting from the room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you really want to leave the room ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onUpdateRoomLeaveConfirmState}>
              No
            </Button>
            <Button variant="primary" onClick={onLeaveFromRoom}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )
}