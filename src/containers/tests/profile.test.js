import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Profile from "../profile";
Enzyme.configure({ adapter: new Adapter() });

describe('profile container',()=>{
    let profileContainer;
    const createUser = jest.fn();
    let test_store;


    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({ authentication: jest.fn(), create_user: {user: {token: "j"}} });
        profileContainer=mount(
            <Profile/>

        );
    });

    it('should render', () => {
        expect(profileContainer).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(profileContainer.find("#offered_rides_count")).toHaveLength(1);
    })
});
