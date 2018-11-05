import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createRide,
         fetchRides,
         requestRideJoin,
         unSetRideCreation,
         UnsetHasRequested} from "../actions/rides";
import M from "materialize-css";
import PropTypes from 'prop-types';
import Spinner from "../components/spinner";
import {Header} from "../App";

export class Home extends Component {
    componentWillReceiveProps(nextProps, nextContext){

        if(nextProps.rideCreated ){
            M.toast({html:"ride Created successfully",classes:'left green darken-4'});
            this.props.unSetRideCreation();
        }

        if(nextProps.setJoin){
            M.toast({html:"join request sent successfully",classes:'left green darken-4'});
            this.props.UnsetHasRequested();
        }

    }

    componentWillMount(){
      this.props.fetchRides();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">

                    <LeftDiv
                        createRide={this.props.createRide}
                        unSetRideCreation={this.props.unSetRideCreation}
                        createError={this.props.createError}
                    />
                    <RightDiv  requestRideJoin={this.props.requestRideJoin} rides={this.props.rides} isFetching={this.props.isFetching}/>
                </div>
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
            description:'',
            rideFromError:'',
            rideToError:'',
            deptDateError:'',
            noSeatsError:'',
            descriptionError:'',
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
       const {rideFrom,rideTo,deptDate,noSeats,description}=this.state;

       const required= 'this field is required';

       if (rideFrom.length===0){
           this.setState({rideFromError:required});
           foundError=true;
       }

       if (rideTo.length===0){
           this.setState({rideToError:required});
           foundError=true;
       }

        if (deptDate.length===0){
            this.setState({deptDateError:required});
            foundError=true;
        }

        if (noSeats.length===0){
            this.setState({noSeatsError:required});
            foundError=true;
        }

        if (description.length===0){
            this.setState({descriptionError:required});
            foundError=true;
        }

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
                                    <span id="from_error" className="error">{this.state.rideFromError}</span>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} name="rideFrom" id="from"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>To</label>
                                </div>
                                <div className="input-col">
                                    <span id="to_error" className="error">{this.state.rideToError}</span>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} name="rideTo" id="to"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>Departure Date</label>
                                </div>
                                <div className="input-col">
                                    <span id="date_error" className="error">{this.state.deptDateError}</span>
                                    <input className="form-input" type="text" placeholder="yyyy-mm-dd hh:mm" onChange={e=>this.handleChange(e)}  name="deptDate"
                                           id="date"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>No. Free Seats</label>
                                </div>
                                <div className="input-col">
                                    <span id="spots_error" className="error">{this.state.noSeatsError}</span>
                                    <input className="form-input" type="text" onChange={e=>this.handleChange(e)} placeholder="4" name="noSeats" id="spots"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="label-col">
                                    <label>Description</label>
                                </div>
                                <div className="input-col">
                                    <span id="description_error" className="error">{this.state.descriptionError}</span>
                                    <textarea className="input-text" rows="5" name="description"
                                              id="description" onChange={e=>this.handleChange(e)} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <input type="submit" id="submit-btn" className="button blue" value="OFFER" onClick={e=>this.handleSubmit(e)}/>
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
                    {this.props.isFetching &&
                        (<Spinner/>)
                    }
                    <ul className="trips_list" id="trips_list">
                        {
                          this.props.rides.map((ride,index)=>
                              (
                                 <SingleRide key={index} ride={ride} requestRideJoin={this.props.requestRideJoin}/>
                              )
                          )
                        }
                    </ul>
                </div>
            </div>

        );
    }
}


export class SingleRide extends Component {

    requestJoin=()=>{
        this.props.requestRideJoin(this.props.ride.ride_id);
    };

    render() {
        return (
            <li >
                <span>
				<b>From:</b> {this.props.ride.origin}
                </span>
                <span>
				<b>To:</b> {this.props.ride.destination}
                </span>
                <span>
                <b>Departure time"</b> {this.props.ride.departure_time}
                </span>
                <p className='desc'>{this.props.ride.description}</p>
                <a href='#' onClick={this.requestJoin} className='button blue'>Send Request</a>
            </li>
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
        setJoin:state.rides.setJoin,
    }
};

export default connect(mapStateToProps, { createRide ,UnsetHasRequested,fetchRides,requestRideJoin, unSetRideCreation})(Home);
