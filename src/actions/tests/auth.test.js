import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '../../globals';
import {handleSignUp, handleLogin} from '../auth'
import {FETCHING, LOG_STATUS, LOGIN_ERROR, LOGIN_USER, SIGNUP_ERROR} from "../types";

describe('test authentication',()=> {
    let store;
    let httpMock;
    let user={
        name:'tony',
        email:'tony@mail.com',
        password:'1234qwer',
        confirm:'1234qwer'
    };

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
    beforeEach(()=>{
        httpMock = new MockAdapter(axiosInstance);
        const mockStore = configureMockStore();
        store = mockStore({}); // pass it the initial state
    });

    it('should signUp user', async () => {
        let response_data={
            'auth_token':'sample token',
            'user_name':'mike'
        };

        httpMock.onPost('auth/signup').reply(201,response_data);
        handleSignUp(user)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:LOGIN_USER,payload:{username:response_data.user_name}},
                {type:LOG_STATUS,payload:true},
                {type:FETCHING,payload:false},
                {type:SIGNUP_ERROR,payload:''},

            ]
        )

    });


    it('should not signUp user', async () => {

        httpMock.onPost('auth/signup').reply(400,{});
        handleSignUp(user)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:SIGNUP_ERROR,undefined},
                {type:LOG_STATUS,payload:false},
                {type:FETCHING,payload:false},
            ]
        )

    });

    it('should login user', async () => {
        let response_data={
            'auth_token':'sample token',
            'user_name':'mike'
        };

        httpMock.onPost('auth/login').reply(200,response_data);
        handleLogin(user)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:LOGIN_USER,payload:{username:response_data.user_name}},
                {type:LOG_STATUS,payload:true},
                {type:FETCHING,payload:false},
                {type:LOGIN_ERROR,payload:''},

            ]
        )

    });

    it('should fail to login user', async () => {
        let response_data={
            'auth_token':'sample token',
            'user_name':'mike'
        };

        httpMock.onPost('auth/login').reply(400,response_data);
        handleLogin(user)(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:LOGIN_ERROR,payload:undefined},
                {type:LOG_STATUS,payload:false},
                {type:FETCHING,payload:false},


            ]
        )

    });



});