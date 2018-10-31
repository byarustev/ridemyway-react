import React, {Component} from 'react';
import SignupForm from '../components/signupForm';

class SignUp extends Component {
    render() {
        return (
            <div className='container'>
                <div className='left-div'>
                    <div className='inner-left'>
                        <div className='text-div'>
                            <h2>Ride My Way App</h2>
                            <p>A carpooling web application that lets you share a ride with your friends.</p>

                            <h3>Features</h3>
                            <ul>
                                <li>Drivers can add a ride to share</li>
                                <li>Passengers can request to join a ride</li>
                                <li>Drivers can either accept or reject a ride request</li>
                                <li>Passengers get notified if their requests are approved or rejected</li>

                            </ul>
                        </div>
                    </div>
                </div>
                <SignupForm/>
            </div>
        );
    }
}

export default SignUp;