import React, {Component} from 'react';

class Friends extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <a href="#" onClick="open_model()" className="button green approve">Incoming Requests</a>
                </div>
                <div className="users-left">
                    <h3>Users</h3>
                    <p><input type="text" name="search_users" placeholder="search users"/></p>
                    <ul className="requests">
                        <li><span>Kato Mike</span>
                            <span>
                                <a href="#" className="button green approve">Make Friend</a>
					        </span>
                        </li>

                    </ul>
                </div>
                <div className="users-right">
                    <h3>Your Friends</h3>
                    <p><input type="text" name="search_friends" placeholder="search friends"/></p>

                    <ul className="requests">
                        <li>
                            <span>Kato Mike</span>
                            <span>
                                <a href="#" className="button blue decline">UnFriend</a>
					        </span>
                        </li>
                    </ul>
                </div>
                <Modal/>
            </div>
        );
    }
}


const Modal =()=>(
    <div id="myModal" className="modal">

        <div className="modal-content">
            <div className="modal-header">
                <span className="close">&times;</span>

            </div>
            <div className="modal-body">
                <h3>New Friend Requests</h3>

                <ul className="requests">


                    <li><span>Kato Mike</span>
                        <span>
						    <a href="!#" className="button green approve">Accept</a>
						    <a href="!#" className="button blue decline">Reject</a>
                        </span>
                    </li>
                </ul>

            </div>
            <div className="modal-footer">
                <a className="button green close_btn" onClick="close_modal()">Close</a>

            </div>
        </div>

    </div>
);

export default Friends;