const contactReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: true,
        };
      case 'SET_CONTACT_DATA':
        return {
          ...state,
          isLoading: false,
          allContacts: action.payload,
        };
      case 'API_ERROR':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  
  export default contactReducer;
  