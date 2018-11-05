import Enzyme,  {shallow, mount}  from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Home, {LeftDiv} from '../home';
import store from "../../store";
Enzyme.configure({ adapter: new Adapter() });

describe('home test component', () => {
    let component;
    let leftDiv;
    const createRide = jest.fn();
    const unSetRideCreation = jest.fn();

    beforeEach(() => {
        component = mount(<Home store={store} unSetRideCreation={unSetRideCreation} createRide={createRide} />
        );
        leftDiv = mount(<LeftDiv createRide={createRide} unSetRideCreation={unSetRideCreation}/>);
    });

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    });

    it('should update props', () => {
        component.setProps({rideCreated:true});
        expect(createRide).toBeCalledTimes(0);
    });


    it('should fail validations with incorect inputs', () => {
        leftDiv.instance().setState(
                {
                    rideFrom: '',
                    rideTo: '',
                    deptDate: '',
                    noSeats: '',
                    description: '',
                },
            );
        leftDiv.find('#submit-btn').simulate('submit');
            expect(createRide).toBeCalledTimes(0);
        }
    );


    it('should pass and call create ride', () => {
        leftDiv.instance().setState(
                {
                    rideFrom: 'name',
                    rideTo: 'to',
                    deptDate: '1900-01-01 8:2',
                    noSeats: 2,
                    description: 'hey there',
                },
            );
        leftDiv.find('#submit-btn').simulate('submit');
        expect(createRide).toBeCalledTimes(1);
        }
    );



});

describe('test invoking on handleChange when form inputs change values', () => {
    let wrapper, instance;
    beforeEach(() => {
        wrapper = shallow(<LeftDiv />);
        instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        jest.spyOn(instance, 'handleSubmit');
    });

    it('should call handleChange when from values change', () => {
        const target={target: {name: 'from', value: 'value'}};
        wrapper.find("#from").simulate('change',target );
        expect(instance.handleChange).toHaveBeenCalledWith(target);
    });

    it('should call handleChange when to values change', () => {
        const toTarget={target: {name: 'to', value: 'to'}};
        wrapper.find("#to").simulate('change',toTarget );
        expect(instance.handleChange).toHaveBeenCalledWith(toTarget);
    });

    it('should call handleChange when date values change', () => {
        const dateTarget={target: {name: 'date', value: 'date'}};
        wrapper.find("#date").simulate('change',dateTarget );
        expect(instance.handleChange).toHaveBeenCalledWith(dateTarget);
    });

    it('should call handleChange when spots values change', () => {
        const spotsTarget={target: {name: 'spots', value: 'spots'}};
        wrapper.find("#spots").simulate('change',spotsTarget );
        expect(instance.handleChange).toHaveBeenCalledWith(spotsTarget);
    });

    it('should call handleChange when description values change', () => {
        const descriptionTarget={target: {name: 'description', value: 'description'}};
        wrapper.find("#description").simulate('change',descriptionTarget );
        expect(instance.handleChange).toHaveBeenCalledWith(descriptionTarget);
    });

    it('should call handleSubmit', () => {
        wrapper.find("#submit-btn").simulate('click');
        expect(instance.handleSubmit).toHaveBeenCalled();
    });


});


