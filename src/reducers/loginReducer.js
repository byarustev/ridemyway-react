import {LOGIN_USER, FETCHING, LOGIN_ERROR, LOG_STATUS} from "../actions/types";

const initialState = {
    user: {},
    loginError:"",
    isLogged:false,
    isFetching: false,
};

const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            };

        case FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload,
            };

        case LOG_STATUS:
            return {
                ...state,
                isLogged: action.payload,
            };

        default:
            return state;
    }
};

export default loginReducer;
