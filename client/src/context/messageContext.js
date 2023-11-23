import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import messageReducer from "../reducer/messageReducer";

const messageContext = createContext();
const API = "/messages"; // update the API URL here

const initialState = {
  allMessages: [],
  isLoading: false,
  isError: false,
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const getMessages = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const messages = await res.data;
      dispatch({ type: "SET_CONTACT_DATA", payload: messages });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages(API);
  }, []);

  console.log("->");
  console.log(state.allMessages);

  return (
    <messageContext.Provider value={{ ...state }}>
      {children}
    </messageContext.Provider>
  );
};

const useMessageContext = () => {
  return useContext(messageContext);
};

export { MessageProvider, useMessageContext };
