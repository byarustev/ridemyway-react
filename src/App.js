import React, { Component } from 'react';
import './App.css';
import {Router, Route} from 'react-router-dom';
import LoginForm from './components/loginForm';
import SignUp from "./containers/signup";
import Home from "./containers/home";
import Trips from "./containers/trips";
import Profile from "./containers/profile";
import Friends from "./containers/friends";
import history from './history';

export const Header=()=>(
    <header>
        <a href="/" className="header-logo">Ride My Way</a>
        <nav className="blue darken-3">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/trips">My Trips</a></li>
                <li><a href="/sign-up">sign up</a></li>
                <li><a href="/friends">friends</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
            <a href="!#" className="header-right button green white-text" onClick="show_post_form()">New Ride</a>
            <a href="!#" className="header-right2" onClick="log_out()"><span id="logged_user"/>{localStorage.getItem('currentUser')} (Log Out)</a>
        </nav>

    </header>
);

class App extends Component{

  render() {
    return (
      <Router history={history}>
          <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/login"  component={LoginForm} />
          <Route path="/sign-up"  component={SignUp} />
          <Route path="/trips"  component={Trips} />
          <Route path="/profile"  component={Profile} />
          <Route path="/friends"  component={Friends} />
          </div>
      </Router>
    );
  }
}

export default App;
