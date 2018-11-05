import authReducer, {initialState} from "../authReducer";
import {FETCHING, LOG_STATUS, LOGIN_ERROR, LOGIN_USER, SIGNUP_ERROR} from "../../actions/types";

describe('auth reducer', () => {

    let user;
    let beforeState;
    beforeEach(() => {
        user={username:"hey test"};
        beforeState = initialState
    });

    it('returns initial state', () => {
        expect(authReducer(undefined, {})).toEqual(beforeState);
    });

    it('sets up logged user', () => {
        const action = {
            type: LOGIN_USER,
            payload: user,
        };
        const afterState = authReducer(beforeState, action);
        beforeState.user=user;
        expect(afterState).toEqual(beforeState);
    });

    it('sets up fetching user', () => {
        const action = {
            type: FETCHING,
            payload: true,
        };
        const afterState = authReducer(beforeState, action);
        beforeState.isFetching=true;
        expect(afterState).toEqual(beforeState);
    });

    it('sets up LOGIN_ERROR user', () => {
        const action = {
            type: LOGIN_ERROR,
            payload: 'not found',
        };
        const afterState = authReducer(beforeState, action);
        beforeState.loginError='not found';
        expect(afterState).toEqual(beforeState);
    });

    it('sets up SIGNUP_ERROR user', () => {
        const action = {
            type: SIGNUP_ERROR,
            payload: 'not found',
        };
        const afterState = authReducer(beforeState, action);
        beforeState.signUpError='not found';
        expect(afterState).toEqual(beforeState);
    });

    it('sets up LOG_STATUS user', () => {
        const action = {
            type: LOG_STATUS,
            payload: true,
        };
        const afterState = authReducer(beforeState, action);
        beforeState.isLogged=true;
        expect(afterState).toEqual(beforeState);
    });

});
