import {axiosInstance} from "../globals";
import {setFetching} from "./auth";
import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR,
    FETCH_RIDES, FETCHING_TRIP_REQUESTS,
    MY_REQUESTS,
    MY_TRIPS,
    MY_TRIPS_ERROR,
    CURRENT_RIDE,
    REQUEST_JOIN, TRIP_REQUESTS
} from "./types";

const setRideCreated=(payload)=>{
    return{
        type:CREATE_RIDE,
        payload
    }
};

const setCreationError=(payload)=>{
    return{
        type:CREATE_RIDE_ERROR,
        payload
    }
};

export const unSetRideCreation=()=>(dispatch)=>{
    dispatch(setRideCreated(false));
};

export const createRide=(rideData)=>async (dispatch)=>{
    dispatch(setFetching(true));
    return await axiosInstance
        .post('users/rides',rideData)
        .then(response=>{
            if(response.data.status==="success"){
                dispatch(setRideCreated(true));
            }
            dispatch(setFetching(false));
        })
        .catch(error=>{
            dispatch(setCreationError(error.response.data.message));
            dispatch(setFetching(false));
        })
};


const setRides=(payload)=>{
    return {
        type:FETCH_RIDES,
        payload
    }
};
export const fetchRides=()=>async (dispatch)=>{
    dispatch(setFetching(true));
    return await axiosInstance
        .get('rides')
        .then(response=>{
            dispatch(setRides(response.data.rides));
            dispatch(setFetching(false));
        })
        .catch(error=>{

            dispatch(setFetching(false));
        })
};

const setHasRequested=(payload)=>{
    return {
        type:REQUEST_JOIN,
        payload
    }
};

export const UnsetHasRequested=()=>(dispatch)=>{
    dispatch(setHasRequested(false));
};

export const requestRideJoin=(rideId)=>async (dispatch)=>{
   dispatch(setFetching(true));
   return await axiosInstance
       .post(`rides/${rideId}/requests`)
       .then(response=>{
           dispatch(setHasRequested(true));
           dispatch(setFetching(false));
       })
       .catch(error=>{
           dispatch(setFetching(false));
       })
};

const setMyRequests=(payload)=>{
    return {
        type:MY_REQUESTS,
        payload
    }
};
const setMyTrips=(payload)=>{
    return {
        type:MY_TRIPS,
        payload
    }
};

const setTripsError=(payload)=>{
    return {
        type:MY_TRIPS_ERROR,
        payload
    }
};

export const fetchMyTrips=()=>async (dispatch)=>{
    dispatch(setFetching(true));
    return await axiosInstance
        .get(`mytrips`)
        .then(response=>{
            dispatch(setMyTrips(response.data.my_rides));
            dispatch(setMyRequests(response.data.my_requests));
            dispatch(setFetching(false));
        })
        .catch(error=>{
            dispatch(setTripsError("fetching failed"));
            dispatch(setFetching(false));
        })

};

const setTripRequests=(payload)=>{
    return {
        type:TRIP_REQUESTS,
        payload
    }
};

const setFetchingTripRequests=(payload)=>{
    return{
        type:FETCHING_TRIP_REQUESTS,
        payload
    }
};

const setCurrentRide=(payload)=>{
    return{
        type:CURRENT_RIDE,
        payload
    }
};

export const fetchRideRequests=(rideId)=>async (dispatch)=>{
    dispatch(setTripRequests([]));
    dispatch(setFetchingTripRequests(true));
    return await axiosInstance
        .get(`users/rides/${rideId}/requests`)
        .then(response=>{
            dispatch(setTripRequests(response.data.requests));
            dispatch(setCurrentRide(rideId));
            dispatch(setFetchingTripRequests(false));
        })
        .catch(error=>{
            dispatch(setFetchingTripRequests(false));
        })
};

export const respondToRequest=(rideId,requestId,data)=>async (dispatch)=>{
    dispatch(setFetchingTripRequests(true));
    return await axiosInstance
        .put(`users/rides/${rideId}/requests/${requestId}`,data)
        .then(response=>{

            dispatch(setFetchingTripRequests(false));
        })
        .catch(error=>{
            dispatch(setFetchingTripRequests(false));
        })
};
