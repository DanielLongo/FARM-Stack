export default (state, action) => {
    switch (action.type) {
        case 'SET_AUTH_STATE':
            return {
                ...state,
                isAuthed: action.payload
            }
        default:
            return state;
    }
}
