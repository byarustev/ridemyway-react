import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Friends from "../friends";
Enzyme.configure({ adapter: new Adapter() });

describe('friends container',()=>{
    let friendsContainer;
    const createUser = jest.fn();
    let test_store;


    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({});
        friendsContainer=mount(
            <Friends/>

        );
    });

    it('should render', () => {
        expect(friendsContainer).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(friendsContainer.find(".users-left")).toHaveLength(1);
    })
});
