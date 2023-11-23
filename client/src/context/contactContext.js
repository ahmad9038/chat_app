import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import contactReducer from "../reducer/contactReducer";

const contactContext = createContext();
const API = "/contacts"; // update the API URL here

const initialState = {
  allContacts: [],
  isLoading: false,
  isError: false,
};

const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const contacts = await res.data;
      dispatch({ type: "SET_CONTACT_DATA", payload: contacts });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts(API);
  }, []);

  console.log(state.allContacts);

  return (
    <contactContext.Provider value={{ ...state }}>
      {children}
    </contactContext.Provider>
  );
};

const useContactContext = () => {
  return useContext(contactContext);
};

export { ContactProvider, useContactContext, contactContext };
