import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Index = () => <h2>Home</h2>;
const Test2 = () => <h2>test</h2>;
const Header=()=>(
    <nav>
        <ul>
            <li>
                <a href='/'>Home</a>
            </li>
            <li>
                <a href='/test/'>Test</a>
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
          <Route path="/test" exact component={Test2} />
          <Header/>
          </div>
      </Router>
    );
  }
}

export default App;
