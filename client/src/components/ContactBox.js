import React from "react";

// chakra
import { Box, Flex, Avatar, Text, AvatarGroup } from "@chakra-ui/react";
import { getSenderName, getSenderPhone } from "../config/ChatLogics";
// import { getSender, getSenderName } from "../config/ChatLogics";

const ContactBox = ({ chat, selectedChat, setSelectedChat, loggedUser }) => {
  return (
    <div>
      <Flex
        align="center"
        padding={{ base: "18px 0", sm: "20px 20px" }}
        bgColor={selectedChat === chat ? "#2a3942" : "transparent"}
        onClick={() => setSelectedChat(chat)}
        cursor={"pointer"}
        sx={styles}
      >
        <Avatar
          size="md"
          name={
            !chat.isGroupChat
              ? getSenderName(loggedUser, chat.users)
              : chat.chatName
          }
          // src="avatar.jpg"
        />
        <Box ml={4} color={"white"}>
          {/* <Text fontWeight="bold">{chat.users[1].name}</Text> */}
          <Text
            fontSize={{ base: "17px", sm: "20px", md: "25px" }}
            fontWeight="bold"
          >
            {!chat.isGroupChat
              ? getSenderName(loggedUser, chat.users)
              : chat.chatName}
          </Text>
          {/* <Text>Last Message Here</Text> */}
        </Box>
        <Box ml="auto">
          <Text
            fontSize={{ base: "12px", sm: "17px", md: "17px" }}
            color={"white"}
          >
            {!chat.isGroupChat ? (
              getSenderPhone(loggedUser, chat.users)
            ) : (
              <AvatarGroup size="sm" color={"black"} max={2}>
                {chat.users.map((user, index) => (
                  <Avatar key={index} name={user.userName} src={user.avatar} />
                ))}
              </AvatarGroup>
            )}
          </Text>
        </Box>
      </Flex>
      <hr style={{ borderColor: "#2a3942" }} />
    </div>
  );
};

// styles
const styles = {
  _hover: {
    backgroundColor: "#2a3942",
  },
};

export default ContactBox;
