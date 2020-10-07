import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Secret from './Secret';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/secret" component={Secret} />
        </Switch>
      </div>
    )
  }
}
export default App;
