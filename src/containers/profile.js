import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMyTrips} from "../actions/rides";
import PropTypes from 'prop-types';
import Spinner from "../components/spinner";
import {Header} from "../App";

export class Profile extends Component {
    componentWillMount(){
        this.fetchTrips();
    }

    fetchTrips = async ()=>{
        await this.props.fetchMyTrips();
    };

    render() {
        return (
        <div>
            <Header />
            <div className='container'>

                <div>
                    <h3>Account user: <span id='current_user'>{localStorage.getItem("currentUser")}</span></h3>
                </div>
                <div className='users-left'>

                    <p className='count' id='offered_rides_count'>{this.props.myTrips?this.props.myTrips.length:0}</p>

                    <h3>Rides You have offered </h3>
                    <ul className='trips_list' id='offered_rides'>
                        {this.props.isFetching &&
                        (<Spinner/>)
                        }
                        {this.props.myTrips &&
                            this.props.myTrips.map((ride,index)=>(
                                <Offer key={index} ride={ride} />
                            ))
                        }
                    </ul>
                </div>
                <div className='users-right'>
                    <p className='count grn'><span id='taken_rides_count'>{this.props.myRequests?this.props.myRequests.length:0}</span></p>
                    <h3>Rides you have Taken </h3>

                    <ul className='trips_list' id='taken_rides'>
                        {this.props.isFetching &&
                        (<Spinner/>)
                        }
                        {this.props.myRequests &&
                            this.props.myRequests.map((request,index)=>(
                                <Request key={index} request={request} />
                            ))
                        }
                    </ul>
                </div>


            </div>
        </div>
        );
    }
}


export class Offer extends Component {
    render() {
        return (
            <li>
            <span>
            <b>From: </b>{this.props.ride.origin}
            </span>
            <span>
            <b>To</b>: {this.props.ride.destination}
            </span>
            <span>
            <b>Departure time</b>: {this.props.ride.departure_time}
            </span>
            <p className='desc'>{this.props.ride.description}</p>
            </li>
        );
    }
}

export class Request extends Component {

    render() {
        return (
            <li>
            <span>
            <b>From:</b> {this.props.request.origin}
            <b> To</b>: {this.props.request.destination}
            </span>
            <span>
            <b>Driver</b>:{this.props.request.owner_name}
            </span>
            <span>
            <b>Departure time</b>:{this.props.request.departure_time}
            </span>
            <p className='desc'>"{this.props.request.description}</p>
            </li>
        );
    }
}



Profile.propTypes = {
    fetchMyTrips: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return{
        isFetching: state.rides.isFetching,
        myTrips: state.rides.myTrips,
        myRequests: state.rides.myRequests,
    }
};

export default connect(mapStateToProps, {fetchMyTrips})(Profile);
