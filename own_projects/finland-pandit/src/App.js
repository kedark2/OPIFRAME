import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/content/Home'
import Gallery from './components/content/Gallery'
import About from './components/content/About'
import Contact from './components/content/Contact'



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/" render={() =>
            <Home />} />
          <Route path="/gallery" render={() =>
            <Gallery />} />
          <Route path="/about" render={() =>
            <About />} />
          <Route path="/contact" render={() =>
            <Contact />} />
        </Switch>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
