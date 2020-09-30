import React from 'react';
import logo from './logo.svg';
import './App.css';
import StatefulComponent from './StatefulComponent';

function App() {
  return (
    <div className="App">
      <StatefulComponent></StatefulComponent>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World
        </a>
      </header>
    </div>
  );
}

export default App;
