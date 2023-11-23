const chatProviderReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FILTER_VALUE":
      let { value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          searched: value,
        },
      };

    case "CLEAR_SEARCH":
      return {
        ...state,
        filters: {
          ...state.filters,
          searched: "",
        },
      };

    case "LOAD_FILTER_CONTACTS":
      return {
        ...state,
        filteredChats: [...action.payload],
      };

    case "FILTER_PRODUCTS":
      let { filteredChats } = state;
      let tempFilterProducts = [...filteredChats];

      const { searched } = state.filters;

      if (searched) {
        tempFilterProducts = tempFilterProducts.filter((cur) => {
          const userNames = cur.users.map((user) =>
            user.userName.toLowerCase()
          );
          const chatName = cur.chatName.toLowerCase();
          return (
            (chatName === "sender" &&
              userNames.some((name) => name.startsWith(searched))) ||
            (chatName !== "sender" && chatName.startsWith(searched))
          );
        });
      }

      return {
        ...state,
        filteredChats: tempFilterProducts,
      };

    case "GET_SORT_VALUE":
      let selectValue = action.payload;
      return {
        ...state,
        sortingValue: selectValue,
      };

    case "SORT":
      let newSortedChat;
      let tempSortChat = [...state.filteredChats];

      if (state.sortingValue === "a-z") {
        newSortedChat = tempSortChat.sort((a, b) => {
          const chatNameA = a.chatName.toLowerCase();
          const chatNameB = b.chatName.toLowerCase();
          return chatNameA.localeCompare(chatNameB);
        });

        return {
          ...state,
          filteredChats: newSortedChat,
        };
      }

      if (state.sortingValue === "z-a") {
        newSortedChat = tempSortChat.sort((b, a) => {
          const chatNameA = a.chatName.toLowerCase();
          const chatNameB = b.chatName.toLowerCase();
          return chatNameA.localeCompare(chatNameB);
        });

        return {
          ...state,
          filteredChats: newSortedChat,
        };
      }

      if (state.sortingValue === "none") {
        return {
          ...state,
          filteredChats: tempSortChat,
        };
      }

      return {
        ...state,
        filteredChats: newSortedChat,
      };
  }
};

export default chatProviderReducer;
