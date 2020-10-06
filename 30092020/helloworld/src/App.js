import React from 'react';
import logo from './logo.svg';
import './App.css';
import StatefulComponent from './StatefulComponent';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <StatefulComponent></StatefulComponent>
      <Card></Card>
      <Card></Card>

    </div>
  );
}

export default App;
