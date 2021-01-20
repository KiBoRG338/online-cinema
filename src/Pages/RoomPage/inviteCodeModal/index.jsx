import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function InviteCodeModal(props) {
    const { isOpen, updateInviteState, handleUpdateInviteCode, inviteToRoom } = props;
    return (
        <Modal show={isOpen} onHide={updateInviteState}>
          <Modal.Header closeButton>
            <Modal.Title>Invite code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" placeholder="Enter invite code" onChange={(event) => handleUpdateInviteCode(event.target.value)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={updateInviteState}>
              Close
            </Button>
            <Button variant="primary" onClick={inviteToRoom}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>
      )
}