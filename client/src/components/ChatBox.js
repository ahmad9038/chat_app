import React from "react";
import { useChatState } from "../context/chatProvider";

//components
import ChatPageHeader from "./ChatPageHeader";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import image from "../img/image.svg";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChatState();

  if (!selectedChat) {
    return (
      <Box
        display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        p={3}
        bg="#222e35"
        w="100%"
        height="100%"
        color="#fff"
        fontSize="18px"
        flexDirection={"column"}
      >
        <img width={"40%"} src={image} alt="" />
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>Web Chat</span>
        <p style={{ fontSize: "15px" }}>
          Connect, Chat, and Collaborate in Real-Time - Empowering Seamless
          Communication
        </p>
      </Box>
    );
  }

  return (
    <Box
      display={{ base: "flex", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="#222e35"
      w={{ base: "100%", md: "68%" }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
