import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from "../signup";
import configureMockStore from "redux-mock-store";
import store from "../../store";
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('signUp container',()=>{
    let signup_conponent;
    const createUser = jest.fn();
    let test_store;


    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({});
        signup_conponent=mount(
            <Provider store={store}>
            <SignUp
                history={{ push: jest.fn() }}
            />
            </Provider>
        );
    });

    it('should render', () => {
        expect(signup_conponent).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(signup_conponent.find(".container")).toHaveLength(1);
    })
});
