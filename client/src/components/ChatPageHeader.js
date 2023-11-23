import React, { useState } from "react";

// chakra
import { Box } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

const ChatPageHeader = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Box>
        <Tooltip label="Hey, I'm here!" aria-label="A tooltip">
          Hover me
        </Tooltip>
      </Box>
    </>
  );
};

export default ChatPageHeader;
