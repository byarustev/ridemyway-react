import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createRide, unSetRideCreation} from "../actions/rides";
import M from "materialize-css";
import PropTypes from 'prop-types';

class Home extends Component {
    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.rideCreated){
            M.toast({html:"ride Created successfully",classes:'left green darken-4'});
            this.props.unSetRideCreation();
        }
    }

    render() {
        return (
            <div className="container">
                <LeftDiv
                    createRide={this.props.createRide}
                    unSetRideCreation={this.props.unSetRideCreation}
                    createError={this.props.createError}
                />
                <RightDiv/>
            </div>
        );
    }
}

export class LeftDiv extends Component {

    constructor(props){
        super(props);
        this.state={
            rideFrom:'',
            rideTo:'',
            deptDate:'',
            noSeats:'',
            description:''
        }
    };

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    };

    handleSubmit=(e)=>{
        if (e) e.preventDefault();
        if(this.validate()){
            const data = {
                origin:this.state.rideFrom,
                destination:this.state.rideTo,
                departure_time:this.state.deptDate,
                slots:this.state.noSeats,
                description:this.state.description,
            };
            this.createRide(data);
        }
    };

    validate=()=>{
       let foundError=false;

       return !foundError;
    };

    createRide= async  (data)=>{
        await this.props.createRide(data);
    };

    render() {
        return (
            <div className="index-left-div" id="index-left-div">
                <div className="search_div">
                    <div className="post_offer_div" id="post_offer_div">
                        <h3 style={{textAlign:'center'}}>Post Ride Offer</h3>
                        <form className="post_offer" id="post_offer_form" method="post" action="#"
                              onSubmit={e=>this.handleSubmit(e)} >

                            <div className="form-row">

                                <div className="label-col">
                                    <label>From</label>
                                    <div className="error">{this.props.createError}</div>
                                </div>
                                <div className="input-col">
                                    <span id="from_error" className="error"/>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} name="rideFrom" id="from"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>To</label>
                                </div>
                                <div className="input-col">
                                    <span id="to_error" className="error"/>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} name="rideTo" id="to"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>Departure Date</label>
                                </div>
                                <div className="input-col">
                                    <span id="date_error" className="error"/>
                                    <input className="form-input" type="text" placeholder="yyyy-mm-dd hh:mm" onChange={e=>this.handleChange(e)}  name="deptDate"
                                           id="date"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>No. Free Seats</label>
                                </div>
                                <div className="input-col">
                                    <span id="spots_error" className="error"/>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} placeholder="4" name="noSeats" id="spots"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>Description</label>
                                </div>
                                <div className="input-col">
                                    <span id="description_error" className="error"/>
                                    <textarea className="input-text" rows="5" name="description"
                                              id="description" onChange={e=>this.handleChange(e)} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <input type="submit" className="button blue" value="OFFER" onClick={e=>this.handleSubmit(e)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export class RightDiv extends Component {
    render() {
        return (
            <div className="right-div">

                <div className="search_resuts" id="search_resuts">
                    <h3>Ride Offers</h3>
                    <ul className="trips_list" id="trips_list">

                    </ul>
                </div>
            </div>

        );
    }
}

Home.propTypes = {
    createRide: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

const mapStateToProps = (state) => {
    return{
        rides: state.rides.rides,
        rideCreated:state.rides.rideCreated,
        fetchError:state.rides.rideCreated,
        createError:state.rides.createError,
        isFetching: state.rides.isFetching,
    }
};

export default connect(mapStateToProps, { createRide , unSetRideCreation})(Home);
