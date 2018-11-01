import {axiosInstance} from "../globals";
import {setFetching} from "./auth";
import {CREATE_RIDE, CREATE_RIDE_ERROR} from "./types";

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


export const fetchRides=()=>async (dispatch)=>{
    dispatch(setFetching(true));
    return await axiosInstance
        .get('rides')
        .then(response=>{
            console.log('rides =>',response.data);
            dispatch(setFetching(false));
        })
        .catch(error=>{

            dispatch(setFetching(false));
        })
};
