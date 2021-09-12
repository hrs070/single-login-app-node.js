export default function authReducer(state = [], action) {
    switch (action.type) {
        case 'SIGNIN':
            localStorage.setItem("singleLoginSession", JSON.stringify({ ...action?.payload }));
            return action.payload;
        case 'LOGOUT':
            localStorage.removeItem("singleLoginSession");
            return action.payload;
        default:
            return state;
    }
}