import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CreateRoomModal(props) {
    const { isOpen, updatecreateRoomState, handleUpdateRoomName, createRoom } = props;
    return (
        <Modal show={isOpen} onHide={updatecreateRoomState}>
          <Modal.Header closeButton>
            <Modal.Title>Create room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" placeholder="Enter room name" onChange={(event) => handleUpdateRoomName(event.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={updatecreateRoomState}>
              Close
            </Button>
            <Button variant="primary" onClick={createRoom}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>
      )
}