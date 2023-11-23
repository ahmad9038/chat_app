import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "../context/chatProvider";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  useDisclosure,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { getSenderName } from "../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import { getSenderFull } from "../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";

// const ENDPOINT = "http://localhost:5000";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const chatContainerRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat } = useChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  // scroll to the bottom
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // fetch all the messages
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/messages/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // send messages
  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setNewMessage("");
      const { data } = await axios.post(
        "/sendMessage",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <Box
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        display={"flex"}
        alignItems={"center"}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<IoMdArrowBack style={{ fontSize: "28px" }} />}
          aria-label="Add Contact"
          mr={4}
          onClick={() => setSelectedChat("")}
        />

        {/* chat section */}
        {selectedChat != null ? (
          !selectedChat.isGroupChat ? (
            <>
              <ProfileModal
                user={getSenderFull(user, selectedChat.users)}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Tooltip label="Profile">
                <Avatar
                  size={{ base: "md" }}
                  name={getSenderName(user, selectedChat.users)}
                  onClick={onOpen}
                  _hover={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Box
                fontSize={{ base: "22px", sm: "24px", md: "24px", lg: "30px" }}
                style={{ color: "white", margin: "10px" }}
              >
                {getSenderName(user, selectedChat.users)}
              </Box>
            </>
          ) : (
            <>
              <GroupChatModal
                isOpen={isOpen}
                onClose={onClose}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
              />
              <Tooltip label="Profile">
                <Avatar
                  size="md"
                  name={selectedChat.chatName}
                  _hover={{ cursor: "pointer" }}
                  onClick={onOpen}
                />
              </Tooltip>
              <div style={{ color: "white", margin: "10px" }}>
                {selectedChat.chatName}
              </div>
            </>
          )
        ) : null}
      </Box>

      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        ref={chatContainerRef}
        overflowY={"auto"}
        flexDirection={"column"}
        padding={"20px"}
      >
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <div style={{ width: "100%" }}>
            <ScrollableChat messages={messages} />
          </div>
        )}
      </Box>
      <FormControl display="flex" alignItems="center" marginBottom={"20px"}>
        <div
          style={{
            display: "flex",
            width: "95%",
            marginTop: "10px",
            margin: "auto",
          }}
        >
          <Input
            value={newMessage}
            onChange={typingHandler}
            color={"white"}
            placeholder="Type your message..."
            size="md"
            mr={2}
            height={"50px"}
            style={{
              outline: "none",
              border: "1px solid #CBD5E0",
              borderRadius: "4px",
              padding: "0.5rem",
            }}
            _focus={{ boxShadow: "none" }}
          />
          {newMessage && (
            <Box
              backgroundColor="#19c37d"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="50px"
              height="50px"
              borderRadius="5"
              onClick={sendMessage}
            >
              <MdSend size={25} style={{ cursor: "pointer", color: "white" }} />
            </Box>
          )}
        </div>
      </FormControl>
    </>
  );
};

export default SingleChat;
