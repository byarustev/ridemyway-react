import Enzyme,  {shallow, mount}  from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import SignUpForm, {SignUpForm as Form} from '../signupForm';
import store from "../../store";

Enzyme.configure({ adapter: new Adapter() });

describe('signup form test component', () => {
    let signUpComponent;
    const handleSignUp = jest.fn();

    beforeEach(() => {
        signUpComponent = mount(<Form store={store} handleSignUp={handleSignUp} isLogged={true} />
        );

    });

    it('renders without crashing', () => {
        expect(signUpComponent).toHaveLength(1);
    });

    it('renders store signupForm', () => {
       let wrapper= mount(<SignUpForm store={store} handleSignUp={handleSignUp}  />);
        expect(wrapper).toHaveLength(1);
    });

    it('should fail validations with incorect inputs', () => {
        signUpComponent.instance().setState(
                {
                    name:'',
                    email:'',
                    password:'',
                    pConfirm:'',
                },
            );
        signUpComponent.find('#submit-button').simulate('submit');
        expect(handleSignUp).toBeCalledTimes(0);
        }
    );

    it('should fail validations for another time', () => {
            signUpComponent.instance().setState(
                {
                    name:'hay',
                    email:'stevmail.com',
                    password:'1234',
                    pConfirm:'1234',
                }
            );
            signUpComponent.find('#submit-button').simulate('submit');
            expect(handleSignUp).toBeCalledTimes(0);
        }
    );

    it('should fail validations for poor password', () => {
            signUpComponent.instance().setState(
                {
                    name:'hay',
                    email:'stevmail.com',
                    password:'abc',
                    pConfirm:'ahs',
                }
                );
            signUpComponent.find('#submit-button').simulate('submit');
            expect(handleSignUp).toBeCalledTimes(0);
        }
    );

    it('should fail validations for password with only digits', () => {
            signUpComponent.instance().setState(
                {
                    name:'hay',
                    email:'stevmail.com',
                    password:'123412341',
                    pConfirm:'123412341',
                }
            );
            signUpComponent.find('#submit-button').simulate('submit');
            expect(handleSignUp).toBeCalledTimes(0);
        }
    );

    it('should fail validations for password with only letters', () => {
            signUpComponent.instance().setState(
                {
                    name:'hay',
                    email:'stevmail.com',
                    password:'abcdabcd',
                    pConfirm:'abcdabcd',
                }
            );
            signUpComponent.find('#submit-button').simulate('submit');
            expect(handleSignUp).toBeCalledTimes(0);
        }
    );

    it('should pass validations and call handleSignup', () => {
            signUpComponent.instance().setState(
                {
                    name:'hithere',
                    email:'ste@vmail.com',
                    password:'1234abcg',
                    pConfirm:'1234abcg',
                }
            );
            signUpComponent.find('#submit-button').simulate('submit');
            signUpComponent.find('#submit-button').simulate('click');
            expect(handleSignUp).toBeCalledTimes(2);

        }
    );

});

describe('test invoking on handleChange when form inputs change values', () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Form handleSignUp={jest.fn()}/>);
        instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        jest.spyOn(instance, 'handleSubmit');
    });

    it('should call handleChange when from values change', () => {
            const target={target: {name: 'steve', value: 'value'}};
            wrapper.find("#name").simulate('change',target );
            expect(instance.handleChange).toHaveBeenCalledWith(target);
    });

    it('should call handleChange when email values change', () => {
        const toTarget={target: {name: 'mail', value: 'mail'}};
        wrapper.find("#email").simulate('change',toTarget );
        expect(instance.handleChange).toHaveBeenCalledWith(toTarget);
    });

    it('should call handleChange when password values change', () => {
            const toTarget={target: {name: 'password', value: 'password'}};
            wrapper.find("#password").simulate('change',toTarget );
            expect(instance.handleChange).toHaveBeenCalledWith(toTarget);
    });

    it('should call handleChange when confirm_password values change', () => {
            const toTarget={target: {name: 'password', value: 'password'}};
            wrapper.find("#confirm_password").simulate('change',toTarget );
            expect(instance.handleChange).toHaveBeenCalledWith(toTarget);
    });

}

);
