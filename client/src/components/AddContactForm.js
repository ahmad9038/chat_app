import React, { useEffect, useState } from "react";
import styles from "../css/AddContactForm.module.css";
import contactImage from "../img/profileImg.jpg";
import { RxCross1 } from "react-icons/rx";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

const AddContactForm = ({ closeContactForm, openModal }) => {
  const toggleContactForm = () => {
    closeContactForm();
    setErrorMessage("");
  };

  const handleAddContact = () => {
    console.log("working");
    openModal();
  };

  // State to store the contacts
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch contacts from the server
  const fetchContacts = async () => {
    try {
      const res = await fetch("/contacts");
      const data = await res.json();
      setContacts(data.contacts);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // to handle the inputs
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // fetch from the server
  const postData = async (e) => {
    e.preventDefault();
    const { name, phone } = user;
    const res = await fetch("/createContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
      }),
    });
    const data = await res.json();

    if (data.message === "created") {
      setErrorMessage("");
      toggleContactForm();
      setUser({ name: "", phone: "" });
    } else if (data.error === "alreadyAvaliable") {
      setErrorMessage("Contact Already Added");
    } else if (data.error) {
      setErrorMessage("Fill All Fields");
    } else if (data.message) {
      setErrorMessage("Enter at least 11 digits");
    }
  };

  // <div className={styles.parent}>
  //   <div
  //     className={`${styles.container} ${
  //       !showMessages ? styles.show : styles.hide
  //     }`}
  //   >
  //     <h1>Add New Contact</h1>
  //     <div className={styles.crossIcon} onClick={toggleContactForm}>
  //       <RxCross1 />
  //     </div>
  //     <form method="POST">
  //       <div className={styles.inputContainer}>
  //         <input
  //           type="number"
  //           name="phone"
  //           onChange={handleInputs}
  //           value={user.phone}
  //           required
  //         />
  //         <label htmlFor="password">Phone</label>
  //       </div>
  //       <button onClick={postData} type="submit">
  //         Add Contact
  //       </button>
  //     </form>
  //     {/* <div style={{ marginTop: "10px", color: "red" }}>{errorMessage}</div> */}
  //   </div>
  // </div>

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={handleAddContact}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width={{ base: "80%", sm: "100%" }}>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default AddContactForm;
