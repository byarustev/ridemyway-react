import React, {Component} from 'react';

class LoginForm extends Component {
    render() {
        return (
            <div className='container'>
                <div className='login-div'>
                    <p className='app-title'>Ride My Way</p>
                    <label id='server_error' className='error'/>
                    <form className='login-form' id='login_form' name='login' onSubmit='return validate_login()'
                          method='post' action='#'>
                        <div className='input-group'>
                            <label>Email <span id='email_error' className='error'/></label>
                            <input className='form-input' type='text' name='email' id='email' />
                        </div>
                        <div className='input-group'>
                            <label>Password <span id='password_error' className='error'/></label>
                            <input className='form-input' type='Password' name='password' id='password' />
                        </div>
                        <div className='input-group'>
                            <input className='button blue login_btn' type='submit' name='submit_login' value='LOGIN'/>
                        </div>
                    </form>
                    <div className='input-group'>
                        <p>Don't Have an Account? <u><a href='/sign-up'>Sign up</a></u></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;