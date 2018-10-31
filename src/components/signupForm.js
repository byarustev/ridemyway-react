import React, {Component} from 'react';

class SignupForm extends Component {
    render() {
        return (
            <div className="signup-div">
                <h3>Signup for Ride My Way</h3>
                <label id="server_error" className="error"/>
                <form id="signup_form" className="signup-form" name="signup"
                      onSubmit="return validate_signup()" method="post" >
                    <div className="input-group">
                        <label>Name <span id="name_error" className="error"/></label>
                        <input className="form-input" type="text" name="name" id="name"/>

                    </div>
                    <div className="input-group">
                        <label>Email <span id="email_error" className="error"/></label>
                        <input className="form-input" type="text" name="email" id="email"/>

                    </div>
                    <div className="input-group">
                        <label>
                            Password <span id="password_error" className="error"/>
                        </label>
                        <input className="form-input" type="Password" name="password" id="password"/>

                    </div>
                    <div className="input-group">
                        <label>
                            Confirm Password <span id="password_error2" className="error"/>
                        </label>
                        <input className="form-input" type="Password" name="confirm_password" id="confirm_password" />

                    </div>
                    <div className="input-group">
                        <input type="submit" className="button blue" name="signup" value="SIGNUP"/>
                    </div>
                </form>
                <div className="input-group">
                    <p>Already Have an Account? <u><a href="/login">Login</a></u></p>
                </div>
            </div>
        );
    }
}

export default SignupForm;