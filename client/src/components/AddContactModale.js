import React, { useState } from "react";
import { useAddChatContext } from "../context/addChatContext";

// chakra
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Avatar,
  Toast,
  useToast,
} from "@chakra-ui/react";

import AddChatBox from "./AddChatBox";
import ChatLoading from "./ChatLoading";
import { useChatState } from "../context/chatProvider";
import axios from "axios";

const AddContactModale = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { updateSearch, searched, isLoading, searchedChats } =
    useAddChatContext();
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useChatState();
  const [loadingChat, setLoadingChat] = useState();

  //access chat
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const isUserInChat = chats.some((chat) =>
        chat.users.some((user) => user._id === userId)
      );

      if (isUserInChat) {
        console.log("exist");
        toast({
          title: "User already added",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      Toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        background={"#495057"}
        color={"white"}
        width={{ base: "80%", sm: "100%" }}
      >
        <ModalHeader fontSize={"30px"}>Add Contact</ModalHeader>
        <ModalCloseButton style={{ color: "white" }} sx={closeButtonStyles} />
        <ModalBody>
          {/* Add contact form or content here */}
          <Input
            type="number"
            placeholder="Search contact by number...0"
            onChange={(event) => updateSearch(event)}
            value={searched}
            style={{ marginBottom: "20px" }}
            sx={inputStyle}
          />

          {isLoading === undefined ? (
            <ChatLoading />
          ) : searchedChats.length === 0 ? (
            <p>No contact found</p>
          ) : (
            searchedChats.map((userChat) => (
              <AddChatBox
                key={userChat._id}
                userChat={userChat}
                handleFunction={() => accessChat(userChat._id)}
              />
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// global styles *******************************************
const closeButtonStyles = {
  _hover: {
    background: "none",
  },
};

const inputStyle = {
  borderRadius: "none",
  color: "white",
  _placeholder: { color: "#ced4da" },
};

export default AddContactModale;
