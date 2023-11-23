import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";

const ProfileModal = ({ user, isOpen, onClose }) => {
  //   const { isOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          style={{ fontSize: "30px", display: "flex", alignItems: "center" }}
        >
          <Avatar
            size="md"
            name={user.userName}
            src="path/to/avatar.jpg"
            style={{ marginRight: "10px" }}
          />
          {user.userName}
        </ModalHeader>
        <hr />
        <ModalCloseButton sx={closeButtonStyles} />

        <ModalBody sx={modalBody}>
          <h1 style={{ marginBottom: 0, fontWeight: "bold" }}>PHONE:</h1>
          <p>{user.phone}</p>
          <h1 style={{ marginBottom: 0, fontWeight: "bold" }}>EMAIL:</h1>
          <p>{user.email}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// custom styles *********************************

//for modal
const closeButtonStyles = {
  color: "black",
  _hover: {
    background: "none",
  },
};

const modalBody = {
  padding: "30px",
};

export default ProfileModal;
