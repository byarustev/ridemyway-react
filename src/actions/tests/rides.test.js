import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '../../globals';
import {createRide, fetchRides,
    unSetRideCreation,
    fetchMyTrips,
    fetchRideRequests,
    UnsetHasRequested,
    respondToRequest,
    requestRideJoin} from '../rides';
import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR, CURRENT_RIDE,
    FETCH_RIDES,
    FETCHING, FETCHING_TRIP_REQUESTS,
    MY_REQUESTS,
    MY_TRIPS,
    MY_TRIPS_ERROR,
    REQUEST_JOIN, TRIP_REQUESTS
} from "../types";

describe('test rides action',()=> {
    let store;
    let httpMock;
    let ride={
        origin:'test',
        destination:'test2',
        departure_time:'1990-01-02 6:10',
        slots:4,
        description:'this is a description',
    };

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
    beforeEach(()=>{
        httpMock = new MockAdapter(axiosInstance);
        const mockStore = configureMockStore();
        store = mockStore({}); // pass it the initial state
    });

    it('should create a ride', async () => {
        let response_data={status:"success"
        };

        httpMock.onPost('users/rides').reply(201,response_data);
        createRide(ride)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:CREATE_RIDE,payload:true},
                {type:FETCHING,payload:false},
            ]
        )

    });

    it('should fail to create a ride', async () => {
        httpMock.onPost('users/rides').reply(400,{});
        createRide(ride)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:CREATE_RIDE_ERROR,undefined},
                {type:FETCHING,payload:false},
            ]
        )

    });

    it('should fail to unset Ride creation', async () => {

        unSetRideCreation(false)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:CREATE_RIDE,payload:false},
            ]
        )

    });

    it('should fail to unset has requested', async () => {

        UnsetHasRequested(false)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:REQUEST_JOIN,payload:false},
            ]
        )

    });


    it('should fetch rides', async () => {
        httpMock.onGet('rides').reply(200,{});
        fetchRides()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:FETCH_RIDES,undefined},
                {type:FETCHING,payload:false},
            ]
        )
    });

    it('should fail to fetch rides', async () => {
        httpMock.onGet('rides').reply(400,{});
        fetchRides()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:FETCHING,payload:false},
            ]
        )
    });

    it('should request join rides', async () => {
        httpMock.onPost('rides/10/requests').reply(200,{});
        requestRideJoin(10)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:REQUEST_JOIN,payload:true},
                {type:FETCHING,payload:false},
            ]
        )
    });

    it('should fail to request join rides', async () => {
        httpMock.onPost('rides/10/requests').reply(400,{});
        requestRideJoin(10)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:FETCHING,payload:false},
            ]
        )
    });


    it('should fetch my trips', async () => {
        httpMock.onGet('mytrips').reply(200,{my_rides:[],my_requests:[]});
        fetchMyTrips()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:MY_TRIPS,payload:[]},
                {type:MY_REQUESTS,payload:[]},
                {type:FETCHING,payload:false},
            ]
        )
    });

    it('should fail to fetch my trips', async () => {
        httpMock.onGet('mytrips').reply(400,{my_rides:[],my_requests:[]});
        fetchMyTrips()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:MY_TRIPS_ERROR,payload:"fetching failed"},
                {type:FETCHING,payload:false},
            ]
        )
    });

    it('should fetch ride requests', async () => {
        httpMock.onGet('users/rides/2/requests').reply(200,{my_rides:[],requests:[]});
        fetchRideRequests(2)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:TRIP_REQUESTS,payload:[]},
                {type:FETCHING_TRIP_REQUESTS,payload:true},
                {type:TRIP_REQUESTS,payload:[]},
                {type:CURRENT_RIDE,payload:2},
                {type:FETCHING_TRIP_REQUESTS,payload:false},
            ]
        )
    });

    it('should fail to fetch ride requests', async () => {
        httpMock.onGet('users/rides/2/requests').reply(400,{my_rides:[],requests:[]});
        fetchRideRequests(2)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:TRIP_REQUESTS,payload:[]},
                {type:FETCHING_TRIP_REQUESTS,payload:true},
                {type:FETCHING_TRIP_REQUESTS,payload:false},
            ]
        )
    });

    it('should respond to requests', async () => {
        httpMock.onPut('users/rides/2/requests/2',{}).reply(200,{my_rides:[],requests:[]});
        respondToRequest(2,2,{})(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING_TRIP_REQUESTS,payload:true},
                {type:FETCHING_TRIP_REQUESTS,payload:false},
            ]
        )
    });


    it('should fail to respond to requests', async () => {
        httpMock.onPut('users/rides/2/requests/2',{}).reply(400,{my_rides:[],requests:[]});
        respondToRequest(2,2,{})(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual(
            [
                {type:FETCHING_TRIP_REQUESTS,payload:true},
                {type:FETCHING_TRIP_REQUESTS,payload:false},
            ]
        )
    });



});