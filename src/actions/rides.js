import {axiosInstance} from "../globals";
import {setFetching} from "./auth";
import {CREATE_RIDE, CREATE_RIDE_ERROR, FETCH_RIDES, REQUEST_JOIN} from "./types";

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
            console.log('rides =>',response.data);
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
