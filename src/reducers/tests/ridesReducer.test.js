import ridesReducer, {initialState} from "../ridesReducer";
import {
    CREATE_RIDE,
    CREATE_RIDE_ERROR,
    FETCH_RIDE,
    FETCH_RIDE_ERROR,
    FETCH_RIDES,
    FETCHING,
    LOGIN_USER
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


});
