import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '../../globals';
import {createRide, unSetRideCreation} from '../rides';
import {CREATE_RIDE, CREATE_RIDE_ERROR, FETCHING} from "../types";

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

});