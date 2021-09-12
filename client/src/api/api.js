import axios from 'axios';

const API = axios.create({ baseURL: 'https://single-login-app-nodejs.herokuapp.com/users' });

export const signIn = (result) => API.post('/signin', result);
export const logOut = (email) => API.post('/signout', email);
export const logOutOthers = (result) => API.post('/signoutothers', result);