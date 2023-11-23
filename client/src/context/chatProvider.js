import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import chatProviderReducer from "../reducer/chatProviderReducer";

const initialState = {
  filteredChats: [],
  sortingValue: "none",
  filters: {
    searched: "",
  },
};

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(chatProviderReducer, initialState);

  // check that the user is authenticated or not
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  // for searching and filtering the chats
  const updateFilterValue = (event) => {
    let { value } = event.target;
    dispatch({ type: "UPDATE_FILTER_VALUE", payload: { value, user } });
  };

  // if i press the cross button the search bar become empty if any text in it
  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };

  // to load every time when a new chat added
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_CONTACTS", payload: chats });
  }, [chats, state.filters]);

  // to filter the chats
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [chats, state.filters]);

  // for sorting
  const sorting = (value) => {
    return dispatch({ type: "GET_SORT_VALUE", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "SORT", payload: chats });
  }, [chats, state.sortingValue]);

  return (
    <chatContext.Provider
      value={{
        ...state,
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        updateFilterValue,
        clearSearch,
        sorting,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

const useChatState = () => {
  return useContext(chatContext);
};

export { ChatProvider, useChatState };
