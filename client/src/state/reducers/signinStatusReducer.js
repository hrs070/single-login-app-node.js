export default function signinStateReducer(state = false, action) {
    switch (action.type) {
        case 'SIGN_IN_STATE':
            return action.payload;
        case 'SIGN_OUT_STATE':
            return action.payload;
        default:
            return state;
    }
}