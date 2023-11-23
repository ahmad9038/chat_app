import { Avatar, Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Tooltip } from "@chakra-ui/react";
import { useChatState } from "../context/chatProvider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import AddChatBox from "./AddChatBox";

const GroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  isOpen,
  onClose,
  fetchMessages,
}) => {
  const { selectedChat, setSelectedChat, user, chats } = useChatState();
  const toast = useToast();
  const [groupName, setGroupName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  //delete user
  const handleDelete = async (userChat) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/removefromgroup`,
        {
          chatId: selectedChat._id,
          userId: userChat._id,
        },
        config
      );

      //if admin remove himself
      userChat._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {}
  };

  //add new user
  const addUser = async (userChat) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only changed by admin",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedChat.users.find((u) => u._id === userChat._id)) {
      toast({
        title: "user already added",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/addtogroup`,
        {
          chatId: selectedChat._id,
          userId: userChat._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {}
  };

  //handle search
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/users?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  //handleSubmit
  const handleSubmit = async () => {
    if (!groupName) {
      toast({
        title: "Fill all fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/rename",
        {
          chatId: selectedChat._id,
          chatName: groupName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      onClose();
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          style={{ fontSize: "30px", display: "flex", alignItems: "center" }}
        >
          <Avatar
            size="md"
            name={selectedChat.chatName}
            src="path/to/avatar.jpg"
            style={{ marginRight: "10px" }}
          />

          {selectedChat.chatName}
        </ModalHeader>
        <hr />
        <ModalCloseButton sx={closeButtonStyles} />

        <ModalBody>
          {/* render selected users  */}
          <Box marginBottom={"10px"}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>

          <Flex align="center" marginBottom="20px">
            <Input
              type="text"
              placeholder="Group Name"
              onChange={(event) => setGroupName(event.target.value)}
              flex="1"
              marginRight="4px"
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Update
            </Button>
          </Flex>

          <Input
            type="number"
            placeholder="Search contact..."
            onChange={(event) => handleSearch(event.target.value)}
          />

          {/* render chats  */}
          <Box padding={"15px"}>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((userChat) => (
                  <AddChatBox
                    key={userChat._id}
                    userChat={userChat}
                    handleFunction={() => addUser(userChat)}
                  />
                ))
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const closeButtonStyles = {
  color: "black",
  _hover: {
    background: "none",
  },
};

export default GroupChatModal;
