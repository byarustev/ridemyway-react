import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {handleSignUp} from "../actions/auth";

export class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            nameError:"",
            email:"",
            emailError:"",
            password:"",
            passwordError:"",
            pConfirm:"",
            pConfirmError:"",
        }
    }

    handleSignUp =async (data)=>{
        await this.props.handleSignUp(data);
        if (this.props.isLogged){
            this.props.history.push("/");
            this.props.history.go();
        }
    };

    handleChange=(e)=>{
      this.setState({[e.target.name]:e.target.value})

    };

    handleSubmit=(e)=>{
        if (e) e.preventDefault();
        if(this.validate()){
           const data={
               name:this.state.name,
               email:this.state.email,
               password: this.state.password,
               confirm:this.state.pConfirm,
            };

            this.handleSignUp(data);
        }
    };


    validate(){
        let foundError=false;
        const {name,email,password,pConfirm}=this.state;

        if(name.length===0){
            this.setState({nameError: 'name is required'});
            foundError=true;
        }else if(name.length<=4){
            this.setState({nameError: 'name should be at least 5 characters'});
            foundError=true;
        }

        if(email.length===0){
            this.setState({emailError: 'name should be at least 5 characters'});
            foundError=true;
        }else if(email.indexOf("@")===-1){
            this.setState({emailError: 'invalid email format'});
            foundError=true;
        }

        if (password.length=== 0 ){
            this.setState({passwordError:"password is required"});
            foundError = true;
        }else if(password.length<8){
            this.setState({passwordError:"weak password, must be at least 8 characters"});
            foundError = true;
        }else if (password.search(/\d/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 digit"});
            foundError = true;
        }else if (password.search(/[a-zA-Z]/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 letter"});
            foundError = true;
        }

        if(pConfirm!==password){
            this.setState({pConfirmError: 'password mismatch'});
            foundError=true;
        }

        return !foundError;
    }

    render() {
        return (
            <div className="signup-div">
                <h3>Signup for Ride My Way</h3>
                <label id="server_error" className="error">{this.props.signUpError}</label>
                <form id="signup_form" className="signup-form" name="signup"
                      onSubmit={e=>this.handleSubmit(e)} method="post" >
                    <div className="input-group">
                        <label>Name <span id="name_error" className="error">{this.state.nameError}</span></label>
                        <input className="form-input" onChange={e=>this.handleChange(e)} type="text" name="name" id="name"/>

                    </div>
                    <div className="input-group">
                        <label>Email <span id="email_error" className="error">{this.state.emailError}</span></label>
                        <input className="form-input" onChange={e=>this.handleChange(e)} type="text" name="email" id="email"/>

                    </div>
                    <div className="input-group">
                        <label>
                            Password <span id="password_error" className="error">{this.state.passwordError}</span>
                        </label>
                        <input className="form-input" onChange={e=>this.handleChange(e)} type="Password" name="password" id="password"/>

                    </div>
                    <div className="input-group">
                        <label>
                            Confirm Password <span id="password_error2" className="error">{this.state.pConfirmError}</span>
                        </label>
                        <input className="form-input" onChange={e=>this.handleChange(e)} type="Password" name="pConfirm" id="confirm_password" />

                    </div>
                    <div className="input-group">
                        <input type="submit" id="submit-button" onClick={e=>this.handleSubmit(e)} className="button blue" name="signup" value="SIGNUP" />
                    </div>
                </form>
                <div className="input-group">
                    <p>Already Have an Account? <u><a href="/login">Login</a></u></p>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

const mapStateToProps = (state) => {
    return{
        user:state.auth.user,
        fetchStatus: state.auth.isFetching,
        signUpError:state.auth.signUpError,
        isLogged:state.auth.isLogged,
    }
};

export default connect(mapStateToProps, { handleSignUp })(SignUpForm);