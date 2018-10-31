import React, {Component} from 'react';

class Profile extends Component {
    render() {
        return (
            <div className='container'>
                <div>
                    <h3>Account user: <span id='current_user'/></h3>
                </div>
                <div className='users-left'>

                    <p className='count' id='offered_rides_count'>0</p>

                    <h3>Rides You have offered </h3>
                    <ul className='trips_list' id='offered_rides'>
                    </ul>
                </div>
                <div className='users-right'>
                    <p className='count grn'><span id='taken_rides_count'>0</span></p>
                    <h3>Rides you have Taken </h3>

                    <ul className='trips_list' id='taken_rides'>
                    </ul>
                </div>


            </div>
        );
    }
}

export default Profile;