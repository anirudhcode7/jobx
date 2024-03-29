import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  itemName,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="delete-modal-title"
      open={isOpen}
      onClose={onClose}
    >
      <Modal.Header>
        <Modal.Title id="delete-modal-title" size={18}>
          Delete {itemName}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this {itemName}? This action cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          auto
          color="error"
          onClick={handleDelete}
          disabled={!confirmDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
