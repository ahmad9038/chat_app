import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useChatState } from "../context/chatProvider";
import { isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { Avatar, Box } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();

  if (messages.length === 0) {
    return <Box sx={emptyMessage}>No chat messages available</Box>;
  }

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          console.log(messages);
          // convert into time format
          const timestamp = m.createdAt;
          const time = new Date(timestamp);
          const formattedTime = time.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          // convert into date format
          const datestamp = m.createdAt;
          const date = new Date(datestamp);
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          };
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);

          const formattedDateUI =
            date.toDateString() === today.toDateString()
              ? "Today"
              : date.toDateString() === yesterday.toDateString()
              ? "Yesterday"
              : date.toLocaleDateString("en-US", options);

          const previousMessage =
            i > 0 ? messages[i - 1].createdAt.split("T")[0] : null;

          // message
          return (
            <>
              {/* date box  */}
              {new Date(m.createdAt).toISOString().split("T")[0] >
                previousMessage || previousMessage == null ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      margin: "30px auto",
                      backgroundColor: "#182229",
                      borderRadius: "5px",
                      height: "30px",
                      alignItems: "center",
                      color: "white",
                      padding: "5px 10px",
                    }}
                  >
                    {formattedDateUI}
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              {/* message box  */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
                key={m._id}
              >
                {!isSameUser(messages, m, i) && m.sender._id !== user._id && (
                  <Avatar mt="7px" mr={1} size="sm" name={m.sender.userName} />
                )}
                <div
                  style={{
                    backgroundColor: "#005c4b",
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    borderRadius: "10px",
                    padding: "10px",
                    maxWidth: "55%",
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                  }}
                >
                  <span>{m.content}</span>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                      marginLeft: "10px",
                      fontSize: "11px",
                      color: "#8cb6ae",
                    }}
                  >
                    {formattedTime}
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </ScrollableFeed>
  );
};

const emptyMessage = {
  textAlign: "center",
  padding: "20px",
  color: "white",
  fontStyle: "italic",
  fontSize: "20px",
};

export default ScrollableChat;
