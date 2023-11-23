const addChatReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH":
      let value = action.payload;
      return {
        ...state,
        searched: value,
      };

    case "SEARCHED_CHATS":
      return {};

    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_CHAT_DATA":
      return {
        ...state,
        isLoading: false,
        searchedChats: action.payload,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};

export default addChatReducer;
