import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR,
    FETCH_RIDE_ERROR,
    FETCH_RIDES,
    FETCH_RIDE,
    FETCHING,
    REQUEST_JOIN
} from "../actions/types";

export const initialState = {
    rides: [],
    rideCreated:false,
    fetchError:"",
    createError:"",
    isFetching: false,
    setJoin:false,
};

const ridesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case CREATE_RIDE:
            return {
                ...state,
                rideCreated:action.payload,
            };

        case CREATE_RIDE_ERROR:
            return {
                ...state,
                createError:action.payload,
            };

        case FETCHING:
            return {
                ...state,
                isFetching:action.payload,
            };

        case FETCH_RIDE_ERROR:
            return {
                ...state,
                fetchError:action.payload,
            };

        case FETCH_RIDES:
            return {
                ...state,
                rides:action.payload,
            };

        case FETCH_RIDE:
            return {
                ...state,
                ride:action.payload,
            };

        case REQUEST_JOIN:
            return {
                ...state,
                setJoin:action.payload
            };

        default:
            return state;
    }
};

export default ridesReducer;