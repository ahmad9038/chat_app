import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContactProvider } from "./context/contactContext";
import { FilterContextProvider } from "./context/filterContext";
import { MessageProvider } from "./context/messageContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ChatProvider } from "./context/chatProvider";
import { BrowserRouter } from "react-router-dom";
import { AddChatProvider } from "./context/addChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <AddChatProvider>
        <ContactProvider>
          <FilterContextProvider>
            <MessageProvider>
              <React.StrictMode>
                <ChakraProvider>
                  <App />
                </ChakraProvider>
              </React.StrictMode>
            </MessageProvider>
          </FilterContextProvider>
        </ContactProvider>
      </AddChatProvider>
    </ChatProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
