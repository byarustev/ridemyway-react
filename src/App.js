import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './components/loginForm';

const Index = () => <h2>Home</h2>;
const Header=()=>(
    <nav>
        <ul>
            <li>
                <a href='/'>Home</a>
            </li>
            <li>
                <a href='/login/'>Login</a>
            </li>

        </ul>
    </nav>
);

class App extends Component {
  render() {
    return (
      <Router>
          <div>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={LoginForm} />
          </div>
      </Router>
    );
  }
}

export default App;
