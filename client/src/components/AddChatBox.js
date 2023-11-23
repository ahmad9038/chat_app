// chakra
import { Avatar, Box, Toast } from "@chakra-ui/react";

const AddChatBox = ({ userChat, handleFunction }) => {
  return (
    <>
      <Box
        onClick={() => handleFunction()}
        sx={boxStyles}
        className="addChatBox"
      >
        <div style={{ marginRight: "10px" }}>
          {/* Avatar with name */}
          <Avatar size="md" name={userChat.userName} />
        </div>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {/* Left section: Name and email */}
            <div style={{ marginBottom: "5px" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                {userChat.userName}
              </p>
              <p className="addContactModalEmail">{userChat.email}</p>
            </div>
          </div>
          <div>
            {/* Right section: Phone */}
            <p>{userChat.phone}</p>
          </div>
        </Box>
      </Box>
    </>
  );
};

const boxStyles = {
  display: "flex",
  marginBottom: "10px",
  backgroundColor: "transparent",
  borderRadius: "none",
  _hover: {
    backgroundColor: "#6c757d",
  },
};

export default AddChatBox;
