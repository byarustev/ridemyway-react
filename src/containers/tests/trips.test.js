import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Trips from "../trips";
Enzyme.configure({ adapter: new Adapter() });

describe('trips container',()=>{
    let tripsContainer;
    const createUser = jest.fn();
    let test_store;


    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({ authentication: jest.fn(), create_user: {user: {token: "j"}} });
        tripsContainer=mount(
                <Trips/>

        );
    });

    it('should render', () => {
        expect(tripsContainer).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(tripsContainer.find(".container")).toHaveLength(1);
    })
});
