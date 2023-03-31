import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ConformationModel(props) {
  return (
    <Modal
      show={props?.show}
      onHide={props?.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props?.content}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => {
            props?.handleNegative();
            props?.handleClose();
          }}
        >
          {props?.negativeButton}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.handlePositive();
            props?.handleClose();
          }}
        >
          {props?.positiveButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConformationModel;
