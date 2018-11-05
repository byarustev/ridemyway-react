import ridesReducer, {initialState} from "../ridesReducer";
import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR, CURRENT_RIDE,
    FETCH_RIDE,
    FETCH_RIDE_ERROR,
    FETCH_RIDES,
    FETCHING, FETCHING_TRIP_REQUESTS,
    LOGIN_USER, MY_REQUESTS, MY_TRIPS, MY_TRIPS_ERROR, REQUEST_JOIN, TRIP_REQUESTS
} from "../../actions/types";

describe('rides reducer', () => {

    let comment;
    let beforeState;
    beforeEach(() => {
        comment={body:"hey test",id:10};
        beforeState = initialState
    });

    it('returns initial state', () => {
        expect(ridesReducer(undefined, {})).toEqual(beforeState);
    });

    it('handles create ride', () => {
        const action = {
            type: CREATE_RIDE,
            payload: true,
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.rideCreated=true;
        expect(afterState).toEqual(beforeState);
    });

    it('handles CREATE_RIDE_ERROR ', () => {
        const action = {
            type: CREATE_RIDE_ERROR,
            payload: 'already found',
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.createError='already found';
        expect(afterState).toEqual(beforeState);
    });

    it('handles fetching ', () => {
        const action = {
            type: FETCHING,
            payload: true,
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.isFetching=true;
        expect(afterState).toEqual(beforeState);
    });

    it('handles fetch ride error ', () => {
        const action = {
            type: FETCH_RIDE_ERROR,
            payload: 'not allowed',
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.fetchError='not allowed';
        expect(afterState).toEqual(beforeState);
    });

    it('handles fetch rides', () => {
        const action = {
            type: FETCH_RIDES,
            payload: [{id:1,from:'from'}],
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.rides=[{id:1,from:'from'}];
        expect(afterState).toEqual(beforeState);
    });

    it('handles fetch single ride', () => {
        const action = {
            type: FETCH_RIDE,
            payload: {id:1,from:'from'},
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.ride={id:1,from:'from'};
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting fetch requests ', () => {
        const action = {
            type: FETCHING_TRIP_REQUESTS,
            payload: true,
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.fetchingTripRequests=true;
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting CURRENT_RIDE ', () => {
        const action = {
            type: CURRENT_RIDE,
            payload: 2,
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.currentRide=2;
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting MY_TRIPS ', () => {
        const action = {
            type: MY_TRIPS,
            payload: [{id:1}],
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.myTrips=[{id:1}];
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting MY_REQUESTS ', () => {
        const action = {
            type: MY_REQUESTS,
            payload: [{id:1}],
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.myRequests=[{id:1}];
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting TRIP_REQUESTS ', () => {
        const action = {
            type: TRIP_REQUESTS,
            payload: [{id:1}],
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.currentTripRequests=[{id:1}];
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting REQUEST_JOIN ', () => {
        const action = {
            type: REQUEST_JOIN,
            payload: true,
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.setJoin=true;
        expect(afterState).toEqual(beforeState);
    });

    it('handles setting MY_TRIPS_ERROR ', () => {
        const action = {
            type: MY_TRIPS_ERROR,
            payload: "error",
        };
        const afterState = ridesReducer(beforeState, action);
        beforeState.tripsError="error";
        expect(afterState).toEqual(beforeState);
    });




});
