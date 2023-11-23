import React, { useState } from "react";
// chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Toast,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useAddChatContext } from "../context/addChatContext";
import { useChatState } from "../context/chatProvider";
import axios from "axios";
import AddChatBox from "./AddChatBox";
import UserBadgeItem from "./UserBadgeItem";
import { GrFormNextLink } from "react-icons/gr";

const AddNewGroupModale = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = useChatState();

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
      Toast({
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
    if (!groupName || !selectedUsers || selectedUsers.length === 0) {
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

      const { data } = await axios.post(
        "/group",
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setSelectedUsers([]);
      onClose();
    } catch (error) {}
  };

  //handleGroup
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  //handleDelete
  const handleDelete = (delUser) => {
    console.log("working");
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        background={"#495057"}
        color={"white"}
        width={{ base: "80%" }}
      >
        <ModalHeader fontSize={"30px"}>Create New Group</ModalHeader>
        <ModalCloseButton style={{ color: "white" }} sx={closeButtonStyles} />
        <ModalBody>
          {/* render selected users  */}
          <Box marginBottom={"10px"}>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>
          {/* Add contact form or content here */}
          <Input
            type="text"
            placeholder="Group Name"
            onChange={(event) => setGroupName(event.target.value)}
            style={{ marginBottom: "20px" }}
            sx={inputStyle}
          />
          <Input
            type="number"
            placeholder="Search contact by number...0"
            onChange={(event) => handleSearch(event.target.value)}
            sx={inputStyle}
          />
        </ModalBody>

        {/* render chats  */}
        <Box padding={"10px"}>
          {loading ? (
            <div>loading</div>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((userChat) => (
                <AddChatBox
                  key={userChat._id}
                  userChat={userChat}
                  handleFunction={() => handleGroup(userChat)}
                />
              ))
          )}
        </Box>
        <ModalFooter>
          <Button onClick={handleSubmit} sx={button}>
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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

const button = {
  background: "#212529",
  color: "white",
  borderRadius: "5px",
  _hover: { background: "black" },
};

export default AddNewGroupModale;
