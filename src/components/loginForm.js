import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {handleLogin} from '../actions/auth'

export class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:"",
            emailError:"",
            password:"",
            passwordError:"",
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    };

    handleLogin = async (data) => {
        await this.props.handleLogin(data);
        if (this.props.isLogged){
            this.props.history.push("/home");
            this.props.history.go();
        }
    };


    handleSubmit=(e)=>{
        if (e) e.preventDefault();
        if(this.validate()){
            this.setState({emailError:"",passwordError:""});

            const data={
                email:this.state.email,
                password: this.state.password
            };

            this.handleLogin(data);
        }
    };

    validate=()=> {
        let email = this.state.email;
        let password = this.state.password;

        let foundError=false;
        if (email.length===0){
            this.setState({emailError:"email is required"});
            foundError=true;
        }

        if (password.length===0){
            this.setState({passwordError:"password is required"});
            foundError=true;
        }

        return !foundError;
    };

    render() {
        return (
            <div className='container'>
                <div className='login-div'>
                    <p className='app-title'>Ride My Way</p>
                    <label id='server_error' className='error'>{this.props.loginError}</label>
                    <form className='login-form' id='login_form' name='login' onSubmit={e=>this.handleSubmit(e)}
                          method='post' action='#' >
                        <div className='input-group'>
                            <label>Email <span id='email_error' className='error'>{this.state.emailError}</span></label>
                            <input className='form-input' onChange={e=>this.handleChange(e)} type='text' name='email' id='email' />
                        </div>
                        <div className='input-group'>
                            <label>Password <span id='password_error' className='error'>{this.state.passwordError}</span></label>
                            <input className='form-input' onChange={e=>this.handleChange(e)} type='Password' name='password' id='password' />
                        </div>
                        <div className='input-group'>
                            <input className='button blue login_btn' onClick={e=>this.handleSubmit(e)} type='submit' name='submit_login' id="submit_login" value='LOGIN'/>
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

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

const mapStateToProps = (state) => {
    return{
        user:state.auth.user,
        fetchStatus: state.auth.isFetching,
        loginError:state.auth.loginError,
        isLogged:state.auth.isLogged,
    }
};

export default connect(mapStateToProps, { handleLogin })(LoginForm);
