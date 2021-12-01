import { LOGIN, LOGOUT } from './actiontypes';

export const login = (data) => ({
    type: LOGIN,
    payload: data,   
});

export const logout = () =>( {
    type: LOGOUT,
});



