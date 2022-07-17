import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function SuccessFailureModal({
  show,
  handleClose,
  orderSuccess = true,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {orderSuccess ? "Order Completed Successfully" : "Order Failed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderSuccess
            ? "Hooray, please collect your items"
            : "Please try placing your order again"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
