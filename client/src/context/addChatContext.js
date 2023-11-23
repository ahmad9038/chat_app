import React, { createContext, useContext, useEffect, useReducer } from "react";
import addChatReducer from "../reducer/addChatReducer";
import { useChatState } from "./chatProvider";
import axios from "axios";
const addChatContext = createContext();

const initialState = {
  searchedChats: [],
  isLoading: false,
  searched: "",
};

const AddChatProvider = ({ children }) => {
  const { user } = useChatState();
  const [state, dispatch] = useReducer(addChatReducer, initialState);

  //fetching data
  const getContacts = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.get(`/users?search=${state.searched}`, config);
      const contacts = await res.data;
      dispatch({ type: "SET_CHAT_DATA", payload: contacts });
      //
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    if (state.searched) {
      getContacts();
    }
  }, [state.searched]);

  // number added in the input search
  const updateSearch = (event) => {
    const value = event.target.value;
    dispatch({ type: "UPDATE_SEARCH", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "SEARCHED_CHATS" });
  }, [state.searched]);

  return (
    <addChatContext.Provider value={{ ...state, updateSearch }}>
      {children}
    </addChatContext.Provider>
  );
};

const useAddChatContext = () => {
  return useContext(addChatContext);
};

export { AddChatProvider, useAddChatContext };
