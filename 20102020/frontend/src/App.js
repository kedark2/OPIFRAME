import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';

class App extends React.Component {

	//REST API


	addToList = (item) => {
		let request = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
				"token": this.props.token
			},
			body: JSON.stringify(item)
		}
		fetch("/api/shopping", request).then(response => {
			if (response.ok) {
				this.getList();
			}
			else {
				if (response.status === 403) {
					this.clearState();
				}
				console.log("Server responded with status:", response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:", error);
		});
	}

	removeFromList = (id) => {
		let request = {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
				"token": this.props.token
			}
		}
		fetch("/api/shopping/" + id, request).then(response => {
			if (response.ok) {
				this.getList();
			}
			else {
				if (response.status === 403) {
					this.clearState();
				}
				console.log("Server responded with status:", response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:", error);
		});
	}

	editItem = (newItem) => {
		let request = {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
				"token": this.props.token
			},
			body: JSON.stringify(newItem)
		}
		fetch("/api/shopping/" + newItem._id, request).then(response => {
			if (response.ok) {
				this.getList();
			}
			else {
				if (response.status === 403) {
					this.clearState();
				}
				console.log("Server responded with status:", response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error:", error);
		});
	}

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
							(<ShoppingList
								removeFromList={this.removeFromList}
								editItem={this.editItem} />)
							:
							(<Redirect to="/" />)
					} />
					<Route path="/form" render={
						() => this.props.isLogged ?
							(<ShoppingForm
								addToList={this.addToList} />)
							:
							(<Redirect to="/" />)
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
