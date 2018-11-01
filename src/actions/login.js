import {axiosInstance} from '../globals'
import {FETCHING, LOG_STATUS, LOGIN_ERROR, LOGIN_USER} from "./types";

const setFetching=(payload)=>{
    return {
        type:FETCHING,
        payload
    }
};

const setLoggedUser=(payload)=>{
    return {
        type:LOGIN_USER,
        payload
    }
};

const setLogStatus=(payload)=>{
    return {
        type:LOG_STATUS,
        payload
    }
};

const setLoginError=(payload)=>{
    return {
        type:LOGIN_ERROR,
        payload
    }
};

export const handleLogin = user_data => async (dispatch) => {
    dispatch(setFetching(true));
    return await axiosInstance
        .post('auth/login', user_data)
        .then((response) => {
            dispatch(setLoggedUser({username:response.data.user_name}));
            localStorage.setItem('currentUser', response.data.users_name);
            localStorage.setItem('token', response.data.auth_token);
            dispatch(setLogStatus(true));
            dispatch(setFetching(false));
            dispatch(setLoginError(""));
        })
        .catch((error) => {
            dispatch(setLoginError(error.response.data.message));
        })
};