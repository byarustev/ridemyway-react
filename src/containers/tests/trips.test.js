import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Trips, {Trips as NonDefaultTrips, SingleRequest, RideRequest, RideOffer} from "../trips";
import store from "../../store";
Enzyme.configure({ adapter: new Adapter() });

describe('trips container',()=>{
    let tripsContainer;
    let connectTrips;
    let tripProps={
        fetchMyTrips:jest.fn(),
        rides:[{ride_id:1}],
        requests:[{ride_id:1}],
    };

    beforeEach(() => {

        tripsContainer=mount(
                <NonDefaultTrips {...tripProps} />
        );
        connectTrips=mount(<Trips store={store} {...tripProps}/>);

    });

    it('should render', () => {
        expect(tripsContainer).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(tripsContainer.find(".container")).toHaveLength(1);
    })

});

describe('test single request and rideRequest',()=>{
    let singleRequest;
    let rideRequest;
    let rideOffer;
    let ride={origin:'kla',destination:'dest',departure_time:'1901, 2:2',owner_name:'hey he',requestor_name:'mike',status: 'pending'};
    let componentProps={
        request:ride,
        ride:ride,
        respondToRequest:jest.fn()
    };

    beforeEach(()=>{
        singleRequest=mount(<SingleRequest {...componentProps}/>);
        rideRequest=mount(<RideRequest {...componentProps}/>);
        rideOffer=mount(<RideOffer {...componentProps} />)
    });

    it('should render single Request', () => {
        expect(singleRequest).toHaveLength(1);
        expect(rideRequest).toHaveLength(1);
    })

    it('should call acceptRequest or rejectRequest',()=>{
        singleRequest.find('.approve').simulate('click');
        singleRequest.find('.decline').simulate('click');

    });

    it('should call acceptRequest or rejectRequest',()=>{
        rideOffer.find('.modal-trigger').simulate('click');

    });


});
