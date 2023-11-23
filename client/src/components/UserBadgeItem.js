import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { RxCross1 } from "react-icons/rx";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Tooltip label={user.userName} hasArrow>
      <Box
        padding={"10px"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"90px"}
      >
        <Avatar size="md" name={user.userName} src="path/to/avatar.jpg" />
        <RxCross1 onClick={handleFunction} style={{ cursor: "pointer" }} />
      </Box>
    </Tooltip>

    // <div>asdf</div>
  );
};

export default UserBadgeItem;
