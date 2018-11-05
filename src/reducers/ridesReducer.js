import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR,
    FETCH_RIDE_ERROR,
    FETCH_RIDES,
    FETCH_RIDE,
    FETCHING,
    REQUEST_JOIN, MY_TRIPS,
    FETCHING_TRIP_REQUESTS,
    CURRENT_RIDE,
    MY_REQUESTS, TRIP_REQUESTS, MY_TRIPS_ERROR
} from "../actions/types";

export const initialState = {
    rides: [],
    rideCreated:false,
    fetchError:"",
    createError:"",
    isFetching: false,
    setJoin:false,
    myTrips:[],
    myRequests:[],
    fetchingTripRequests:false,
    currentRide:'',
    currentTripRequests:[],
};

const ridesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCHING_TRIP_REQUESTS:
            return{
                ...state,
                fetchingTripRequests: action.payload,
            };

        case CURRENT_RIDE:
            return{
                ...state,
                currentRide: action.payload,
            };

        case MY_TRIPS:
            return {
                ...state,
                myTrips: action.payload
            };

        case MY_REQUESTS:
            return {
                ...state,
                myRequests: action.payload
            };

        case TRIP_REQUESTS:
            return {
                ...state,
                currentTripRequests: action.payload,
            };

        case MY_TRIPS_ERROR:
            return {
                ...state,
                tripsError: action.payload,
            };

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