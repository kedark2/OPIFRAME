import React from 'react';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';

class App extends React.Component {

	//REST API

	render() {
		return (
			<div className="App">
				<Navbar />
				<hr />
				<Switch>
					<Route exact path="/" render={
						() => this.props.isLogged ?
							(<Redirect to="/list" />)
							:
							(<LoginPage />)
					} />
					<Route path="/list" render={
						() => this.props.isLogged ?
							(<ShoppingList />)
							:
							(<Redirect to="/" />)
					} />
					<Route path="/form" render={
						() => this.props.isLogged ?
							(<ShoppingForm />)
							:
							(<Redirect to="/" />)
					} />
					<Route render={
						() => this.props.isLogged ?
							(<Redirect to="/list" />)
							:
							(<LoginPage />)
					} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.login.token,
		isLogged: state.login.isLogged
	}
}

export default connect(mapStateToProps)(App);
