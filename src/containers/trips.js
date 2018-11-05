import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMyTrips, fetchRideRequests, respondToRequest} from "../actions/rides";
import PropTypes from 'prop-types';
import M from 'materialize-css';
import Spinner from "../components/spinner";
import {Header} from "../App";

export class Trips extends Component {
    componentWillMount(){
        this.getTrips();
    }

    getTrips = async ()=>{
        await this.props.fetchMyTrips();
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Rides fetchRideRequests={this.props.fetchRideRequests}
                           rides={this.props.myTrips} requests={this.props.myRequests}
                           isFetching={this.props.isFetching}/>

                    <Modal currentTripRequests={this.props.currentTripRequests}
                           fetchingTripRequests={this.props.fetchingTripRequests}
                           currentRide={this.props.currentRide}
                           fetchRideRequests={this.props.fetchRideRequests}
                           respondToRequest={this.props.respondToRequest}
                    />
                </div>
            </div>
        );
    }
}

export class Rides extends React.Component {

    render(){
        return(
            <div className="rides">
                <h3>Rides</h3>
                <p>This section contains ride that were offered by you.</p>
                <table>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure Date</th>
                        <th>Time</th>
                        <th>No. Slots</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody id="users_posted_offers">
                    {this.props.isFetching &&
                    (<Spinner/>)
                    }
                    {!this.props.isFetching && this.props.rides && this.props.rides.length===0 &&
                    (<tr><td colSpan={"6"}>You have no rides</td></tr>)
                    }
                    {this.props.rides &&
                        this.props.rides.map((ride,index)=>(
                            <RideOffer key={index} ride={ride}
                                       fetchRideRequests={this.props.fetchRideRequests}
                            />
                        ))
                    }
                    </tbody>
                </table>


                <h3>Ride Requests</h3>
                <p>This section contains rides that you requested to join. These are other Drivers' rides.</p>
                <table>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure Date</th>
                        <th>Time</th>
                        <th>Driver</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody id="users_requests">
                    {this.props.isFetching &&
                    (<Spinner/>)
                    }
                    {!this.props.isFetching && this.props.requests && this.props.requests.length===0 &&
                    (<tr><td colSpan={"6"}>You have no requests</td></tr>)
                    }
                    {this.props.requests &&
                        this.props.requests.map((request,index)=>(
                            <RideRequest key={index} request={request} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}


export class RideOffer extends Component {

    fetchRequests=async ()=>{
        await this.props.fetchRideRequests(this.props.ride.ride_id);
    };

    render() {
        return (
            <tr>
                <td>{this.props.ride.origin}</td>
                <td>{this.props.ride.destination}</td>
                <td>{this.props.ride.departure_time.split(" ")[0]}</td>
                <td>{this.props.ride.departure_time.split(" ")[1]}</td>
                <td><span className='no'>{this.props.ride.slots}</span></td>
                {/*<td></td>*/}
                <td><a href='#modal1' className='button blue modal-trigger' onClick={this.fetchRequests}>Manage Trip</a></td>
            </tr>
        );
    }
}

export class RideRequest extends Component {

    render() {
        return (
            <tr>
            <td>{this.props.request.origin}</td>
            <td>{this.props.request.destination}</td>
            <td>{this.props.request.departure_time.split(' ')[0]}</td>
            <td>{this.props.request.departure_time.split(' ')[1]}</td>
            <td>{this.props.request.owner_name}</td>
            <td>{this.props.request.status}</td>
            </tr>
        );
    }
}


export class Modal extends Component {


    componentDidMount(){
        let elem = document.querySelectorAll('.modal');
        M.Modal.init(elem, {});
    }
    render() {
        return (
            <div id="modal1" className="modal">

                <div className="modal-content">

                    <div className="modal-body">
                        <h3>Ride Requests</h3>
                        {/*<p>Remaining spots:<span id="remain_slots"></span></p>*/}
                        <ul className="requests" id="ride_requests">
                            {this.props.fetchingTripRequests &&
                            (<Spinner/>)
                            }
                            {!this.props.fetchingTripRequests && this.props.currentTripRequests && this.props.currentTripRequests.length===0 &&
                            (<p>This trip has no requests</p>)
                            }

                            {this.props.currentTripRequests &&
                                this.props.currentTripRequests.map((request,index)=>(
                                    <SingleRequest key={index} request={request}
                                                   respondToRequest={this.props.respondToRequest}
                                                   fetchRideRequests={this.props.fetchRideRequests}
                                    />
                                ))
                            }

                        </ul>

                    </div>
                    <div className="modal-footer">
                        {/*<a href="!#" className="button green modal-close" >Close</a>*/}

                    </div>
                </div>

            </div>
        );
    }
}

export class SingleRequest extends Component {
    //request["ride_id"]+","+request["request_id"]+",'accepted'
    acceptRequest=async ()=>{
       let data={
           'status':'accepted'
        };
        const requestId=this.props.request.request_id;
        const rideId=this.props.request.ride_id;

        await this.props.respondToRequest(rideId,requestId,data);
        this.props.fetchRideRequests(this.props.request.ride_id);
    };

    rejectRequest=async ()=> {
        const rideId=this.props.request.ride_id;
        const requestId=this.props.request.request_id;
        let data={
            'status':'rejected'
        };

        await this.props.respondToRequest(rideId,requestId,data);
        this.props.fetchRideRequests(this.props.request.ride_id);
    };



    render() {
        return (
            <li><span>{this.props.request.requestor_name}</span>
                <span>
                    {this.props.request.status === 'pending' ?
                        (<span>
                           <a href='#!' className='button green approve' onClick={this.acceptRequest}>Approve</a>
                           <a href='#!' className='button blue decline' onClick={this.rejectRequest}>Decline</a>
                        </span>
                        ) :
                        <h3>{this.props.request.status}</h3>
                    }
                    </span>
                </li>
        );
    }
}


Trips.propTypes = {
    fetchMyTrips: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return{
        isFetching: state.rides.isFetching,
        myTrips: state.rides.myTrips,
        myRequests: state.rides.myRequests,
        fetchingTripRequests: state.rides.fetchingTripRequests,
        currentTripRequests: state.rides.currentTripRequests,
        currentRide: state.rides.currentRide,
    }
};

export default connect(mapStateToProps, {fetchMyTrips, respondToRequest, fetchRideRequests})(Trips);
