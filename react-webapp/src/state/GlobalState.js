import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  isAuthed: JSON.parse(localStorage.getItem("isAuthed")),
  user: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state
  function setAuthState(item) {
    dispatch({
      type: "SET_AUTH_STATE",
      payload: item,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        // State
        isAuthed: state.isAuthed,
        // Reducers
        setAuthState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
