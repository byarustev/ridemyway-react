import React, {Component} from 'react';

class Trips extends Component {
    render() {
        return (
            <div className="container">
                <Rides/>
                <Modal/>
            </div>
        );
    }
}

export const Rides = ()  => (
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
                <th>No. Requests</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody id="users_posted_offers">

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


            </tbody>
        </table>
    </div>
);

export const Modal =()=>(

    <div id="myModal" className="modal">

        <div className="modal-content">
            <div className="modal-header">
                <span className="close">&times;</span>

            </div>
            <div className="modal-body">
                <h3>Ride Requests</h3>
                <p>Remaining spots:<span id="remain_slots">4</span></p>
                <ul className="requests" id="ride_requests">

                </ul>

            </div>
            <div className="modal-footer">
                <a href="!#" className="button green close_btn" onClick="close_modal()">Close</a>

            </div>
        </div>

    </div>
);




export default Trips;