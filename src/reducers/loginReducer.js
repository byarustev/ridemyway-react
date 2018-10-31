import {LOGIN_USER,FETCHING} from "../actions/types";

const initialState = {
    user: {},
    isFetching: false,
};

const loginReducer = (state = initialState, action) =>{
    // switch (action.type) {
    //     case LOGIN_USER:
    //         return {
    //             ...state,
    //             user: action.payload,
    //         };
    //
    //     case FETCHING:
    //         return {
    //             ...state,
    //             isFetching: action.payload,
    //         };
    //
    //     default:
    //         return state;
    // }
};

export default loginReducer();
