import React, { createContext, useContext, useEffect, useReducer } from "react";
import filterContactReducer from "../reducer/filterContactReducer";
import { useContactContext } from "./contactContext";

const filterContext = createContext();

const initialState = {
  filterContacts: [],
  allContacts: [],
  sortingValue: "none",
  filters: {
    searched: "",
  },
};

const FilterContextProvider = ({ children }) => {
  const { allContacts } = useContactContext();
  const [state, dispatch] = useReducer(filterContactReducer, initialState);

  const updateFilterValue = (event) => {
    let { name, value } = event.target;
    dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
    console.log(value);
  };

  const sorting = (event) => {
    let selectValue = event.target.getAttribute("value");
    console.log(selectValue);
    return dispatch({ type: "GET_SORT_VALUE", payload: selectValue });
  };

  // if i press the cross button the search bar become empty if any text in it
  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_CONTACTS", payload: allContacts });
  }, [allContacts]);

  // when there is change the fitlers or allItems then it works
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [allContacts, state.filters]);

  // for sorting
  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS", payload: allContacts });
  }, [allContacts, state.sortingValue]);

  return (
    <filterContext.Provider
      value={{ ...state, updateFilterValue, clearSearch, sorting }}
    >
      {children}
    </filterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(filterContext);
};

export { FilterContextProvider, useFilterContext };
