import React, { useState } from "react";
import { useChatState } from "../context/chatProvider";

//components
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";

//chakra imports
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user, selectedChat } = useChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w="100%"
        h="100vh"
        padding={{ base: "0", lg: "20px" }}
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
