import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <LeftDiv/>
                <RightDiv/>
            </div>
        );
    }
}

export class LeftDiv extends Component {
    render() {
        return (
            <div className="index-left-div" id="index-left-div">
                <div className="search_div">
                    <h3 style={{textAlign:'center'}}>Search Ride Offer</h3>
                    <form method="post" action="">
                        <div className="form-row">
                            <div className="label-col">
                                <label>From</label>
                            </div>
                            <div className="input-col">
                                <input className="form-input" type="text" name="search_from" id="search_from"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="label-col">
                                <label>To</label>
                            </div>
                            <div className="input-col">
                                <input className="form-input" type="text" name="search_to" id="seearch_to"/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="label-col">
                                <label>Departure Date</label>
                            </div>
                            <div className="input-col">
                                <input className="form-input" type="text" placeholder="dd/mm/yyyy" name="search_date"
                                       id="search_date"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <input className="button green" type="submit" name="search_ride" value="SEARCH"/>
                            </div>
                        </div>
                    </form>
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

                <div className="post_offer_div" id="post_offer_div">
                    <h3 style={{textAlign:'center'}}>Post Ride Offer</h3>
                    <form className="post_offer" id="post_offer_form" method="post" action="#"
                          onSubmit="return validate_ride_post()">

                        <div className="form-row">
                            <div className="label-col">
                                <label>From</label>
                            </div>
                            <div className="input-col">
                                <span id="from_error" className="error"/>
                                <input className="form-input" type="text" name="from" id="from"/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="label-col">
                                <label>To</label>
                            </div>
                            <div className="input-col">
                                <span id="to_error" className="error"/>
                                <input className="form-input" type="text" name="to" id="to"/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="label-col">
                                <label>Departure Date</label>
                            </div>
                            <div className="input-col">
                                <span id="date_error" className="error"/>
                                <input className="form-input" type="text" placeholder="yyyy-mm-dd hh:mm" name="date"
                                       id="date"/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="label-col">
                                <label>No. Free Seats</label>
                            </div>
                            <div className="input-col">
                                <span id="spots_error" className="error"/>
                                <input className="form-input" type="text" placeholder="4" name="spots" id="spots"/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="label-col">
                                <label>Description</label>
                            </div>
                            <div className="input-col">
                                <span id="description_error" className="error"/>
                                <textarea className="input-text" rows="5" name="description"
                                          id="description" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <input type="submit" className="button blue" value="OFFER"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;