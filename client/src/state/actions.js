import * as api from '../api/api.js';

export const signIn = (result) => async (dispatch) => {
    try {
        const response = await api.signIn(result);
        dispatch({ type: 'SIGNIN', payload: response });
        dispatch({ type: 'SIGN_IN_STATE', payload: true });
    } catch (error) {
        console.log(error)
    }
}
export const logOut = (email) => async (dispatch) => {
    await api.logOut(email);
    dispatch({ type: 'LOGOUT', payload: [] });
    dispatch({ type: 'SIGN_OUT_STATE', payload: false });
}

export const logOutOthers = (result) => async (dispatch) => {
    try {
        const response = await api.logOutOthers(result);
        dispatch({ type: 'SIGNIN', payload: response });
        dispatch({ type: 'SIGN_IN_STATE', payload: true });
    } catch (error) {
        console.log(error)
    }
}