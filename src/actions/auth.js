import {axiosInstance} from '../globals'
import {FETCHING, LOG_STATUS, LOGIN_ERROR, LOGIN_USER, SIGNUP_ERROR} from "./types";

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

const setSignUpError=(payload)=>{
    return {
        type:SIGNUP_ERROR,
        payload
    }
};



export const handleLogin = userData => async (dispatch) => {
    dispatch(setFetching(true));
    return await axiosInstance
        .post('auth/login', userData)
        .then((response) => {
            dispatch(setLoggedUser({username:response.data.user_name}));
            localStorage.setItem('currentUser', response.data.users_name);
            localStorage.setItem('tokensetSignUpError', response.data.auth_token);
            dispatch(setLogStatus(true));
            dispatch(setFetching(false));
            dispatch(setLoginError(""));
        })
        .catch((error) => {
            dispatch(setLoginError(error.response.data.message));
            dispatch(setLogStatus(false));
            dispatch(setFetching(false));
        })
};


export const handleSignUp = userData => async (dispatch)=>{
    dispatch(setFetching(true));
    return await axiosInstance
        .post('auth/signup',userData)
        .then(response=>{
            dispatch(setLoggedUser({username:response.data.user_name}));
            localStorage.setItem('currentUser', response.data.users_name);
            localStorage.setItem('tokensetSignUpError', response.data.auth_token);
            dispatch(setLogStatus(true));
            dispatch(setFetching(false));
            dispatch(setSignUpError(""));
        })
        .catch(error=>{
            dispatch(setSignUpError(error.response.data.message));
            dispatch(setLogStatus(false));
            dispatch(setFetching(false));
        })
};

