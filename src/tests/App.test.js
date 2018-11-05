import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, {Header} from '../App';
import {Provider} from 'react-redux';
import store from "../store";

Enzyme.configure({adapter:new Adapter()});

describe('test app',()=>{
    it('renders without crashing', () => {
        mount(
            <Provider store={store}>
            <App/>
            </Provider>
        );
    });

    it('header renders without crashing', () => {
        mount(
            <Header/>
        );
    });

})


