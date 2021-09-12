import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signIn = (result) => API.post('/users/signin', result);
export const logOut = (email) => API.post('/users/signout', email);
export const logOutOthers = (result) => API.post('/users/signoutothers', result);