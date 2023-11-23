import React, { useEffect, useState } from "react";

// chakra
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Tooltip,
  useDisclosure,
  Toast,
  InputGroup,
  InputRightElement,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";

//icons
import { BsPersonFillAdd, BsFilter } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/filterContext";
import { useChatState } from "../context/chatProvider";
import ProfileModal from "./ProfileModal";
import AddContactModale from "./AddContactModale";
import ContactBox from "./ContactBox";
import axios from "axios";
import AddNewGroupModale from "./AddNewGroupModale";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    user,
    selectedChat,
    setSelectedChat,
    setChats,
    updateFilterValue,
    filteredChats,
    clearSearch,
    sorting,
  } = useChatState();
  const [searchValue, setSearchValue] = useState("");
  const clearSearchValue = () => {
    setSearchValue(""); // Reset the search value
    clearSearch(); // Clear the search filter
  };
  console.log(searchValue);

  //avatar setting when clicked the profile modal opens
  const { isOpen, onOpen, onClose } = useDisclosure();

  //for fetch data
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  //for contact modal
  const {
    isOpen: isCModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  //for add new group modal
  const {
    isOpen: isGroupModalOpen,
    onOpen: onGroupModalOpen,
    onClose: onGroupModalClose,
  } = useDisclosure();

  //for search
  const navigate = useNavigate();
  // const { updateFilterValue, clearSearch } = useFilterContext();

  // logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Box
      w={{ base: "100%", md: "50%" }}
      bg="#111b21"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
    >
      <Flex justify="space-between" align="center" p={4}>
        <Flex align="center">
          <ProfileModal user={user} isOpen={isOpen} onClose={onClose} />
          <Tooltip label="Profile">
            <Avatar
              size="md"
              name={user.userName}
              src="path/to/avatar.jpg"
              sx={avatarStyles}
              onClick={onOpen}
            />
          </Tooltip>
        </Flex>
        <Flex align="center">
          <Tooltip label="Create New Group">
            <IconButton
              icon={<MdGroupAdd style={{ color: "white", fontSize: "28px" }} />}
              aria-label="Add Contact"
              mr={4}
              sx={buttonStyles}
              onClick={onGroupModalOpen}
            />
          </Tooltip>
          <Tooltip label="Add Contact">
            <IconButton
              icon={
                <BsPersonFillAdd style={{ color: "white", fontSize: "25px" }} />
              }
              aria-label="Add Contact"
              mr={4}
              sx={buttonStyles}
              onClick={onModalOpen}
            />
          </Tooltip>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              icon={
                <HiOutlineDotsVertical
                  style={{ color: "white", fontSize: "25px" }}
                />
              }
              aria-label="Options"
              sx={buttonStyles}
            />
            <MenuList
              border={"none"}
              borderRadius={"none"}
              background={"#495057"}
            >
              <MenuItem sx={menuListStyle} onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Search bar section */}
      <Flex justify="space-between" align="center" p={4}>
        <Box flex="1">
          <Flex
            align="center"
            bg="white"
            borderRadius="md"
            style={{ marginRight: "20px" }}
          >
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Search messages..."
                outline="none"
                border="none"
                _focus={{
                  boxShadow: "none",
                  outline: "none",
                }}
                value={searchValue} // Bind the input value to searchValue state
                onChange={(event) => {
                  setSearchValue(event.target.value);
                  updateFilterValue(event);
                }}
              />
              <InputRightElement
                width="2rem"
                marginRight={"10px"}
                cursor={"pointer"}
                onClick={clearSearchValue} // Call the clearSearchValue function
              >
                {searchValue && <RxCross1 />}
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>
        {/* filter icon  */}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<BsFilter style={{ fontSize: "25px" }} />}
            backgroundColor={"#222e35"}
            color={"white"}
            sx={filterIconStyles}
          />

          <MenuList
            backgroundColor={"#495057"}
            color={"white"}
            borderRadius={"none"}
            border={"none"}
          >
            <MenuOptionGroup
              defaultValue="none"
              title="Filter"
              type="radio"
              onChange={(value) => sorting(value)}
            >
              <MenuItemOption sx={menuListStyle} value="a-z">
                a-z
              </MenuItemOption>
              <MenuItemOption sx={menuListStyle} value="z-a">
                z-a
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      {/* Contact boxes */}
      <Box p={5} overflowY="auto" maxHeight="calc(100vh - 250px)">
        {filteredChats.map((chat) => {
          return (
            <ContactBox
              key={chat._id}
              chat={chat}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              loggedUser={loggedUser}
            />
          );
        })}
      </Box>

      {/* Modal for adding a contact */}
      <AddContactModale isOpen={isCModalOpen} onClose={onModalClose} />

      {/* Modal for adding a new group */}
      <AddNewGroupModale
        isOpen={isGroupModalOpen}
        onClose={onGroupModalClose}
      />
    </Box>
  );
};

// custom styles
const buttonStyles = {
  background: "none",
  border: "none",
  outline: "none",
  borderRadius: "50%",
  _hover: { background: "#222e35" },
  _active: { background: "#222e35" },
};

const menuListStyle = {
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "none",
  color: "white",
  _hover: { backgroundColor: "#222e35" },
};

// avatar
const avatarStyles = {
  _hover: {
    cursor: "pointer",
  },
};

const filterIconStyles = {
  _hover: {
    background: "black",
  },
  _active: {
    background: "black",
  },
};

export default MyChat;
