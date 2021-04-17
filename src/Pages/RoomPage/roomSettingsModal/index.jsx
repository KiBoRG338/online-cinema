import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function RoomSettingsModal(props) {
    const { isOpen, roomName, onUpdateRoomDeleteConfirmState, updateRoomSettingState, handleUpdateRoomName, onChangeRoomName } = props;
    return (
        <Modal show={isOpen} onHide={updateRoomSettingState}>
          <Modal.Header closeButton>
            <Modal.Title>Settings of the room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control defaultValue={roomName} type="text" placeholder="Enter room name" onChange={(event) => handleUpdateRoomName(event.target.value)} />
            <br/>
            <Button variant="primary" onClick={onUpdateRoomDeleteConfirmState}>Delete the room</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={updateRoomSettingState}>
              Close
            </Button>
            <Button variant="primary" onClick={onChangeRoomName}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>
      )
}