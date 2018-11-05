import Enzyme,  {shallow, mount}  from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm, {LoginForm as Login} from '../loginForm';
import store from "../../store";

Enzyme.configure({ adapter: new Adapter() });

describe('login form test component', () => {
    let loginComponent;
    const handleLogin = jest.fn();

    beforeEach(() => {
        loginComponent = mount(<Login handleLogin={handleLogin} isLogged={true}/>
        );
    });

    it('renders without crashing', () => {
        expect(loginComponent).toHaveLength(1);
    });

    it('renders store login', () => {
        let wrapper= mount(<LoginForm store={store} handleLogin={handleLogin}  />);
        expect(wrapper).toHaveLength(1);
    });

    it('should fail validations with empty inputs', () => {
        loginComponent.instance().setState(
                {
                    email:'',
                    password:'',
                },
            );
        loginComponent.find('#submit_login').simulate('submit');
            expect(handleLogin).toBeCalledTimes(0);
        }
    );

    it('should pass validations', () => {
        loginComponent.instance().setState(
                {
                    email:'stevmail.com',
                    password:'1234abch',
                }
            );
        loginComponent.find('#submit_login').simulate('submit');
        loginComponent.find('#submit_login').simulate('click');
        expect(handleLogin).toBeCalledTimes(2);
        }
    );

});

describe('test invoking on handleChange when form inputs change values', () => {
        let wrapper, instance;

        beforeEach(() => {
            wrapper = shallow(<Login handleLogin={jest.fn()}/>);
            instance = wrapper.instance();
            jest.spyOn(instance, 'handleChange');
            jest.spyOn(instance, 'handleSubmit');
        });

        it('should call handleChange when from values change', () => {
            const target={target: {email: 'mail', value: 'mail@me.com'}};
            wrapper.find("#email").simulate('change',target );
            expect(instance.handleChange).toHaveBeenCalledWith(target);
        });

        it('should call handleChange when password values change', () => {
            const toTarget={target: {name: 'password', value: '1234qwer'}};
            wrapper.find("#password").simulate('change',toTarget );
            expect(instance.handleChange).toHaveBeenCalledWith(toTarget);
        });


    });
