export default (state, action) => {
  switch (action.type) {
    case "SET_AUTH_STATE":
      return {
        ...state,
        isAuthed: localStorage.setItem("isAuthed", action.payload),
      };
    default:
      return state;
  }
};
