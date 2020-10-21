import { clearShoppingState, getList } from './shoppingActions'

export const LOADING = "LOADING";
export const LOADING_DONE = "LOADING_DONE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

//ASYNC ACTIONS
export const register = (user) => {
	return dispatch => {
		let request = {
			method: "POST",
			mode: "cors",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(user)
		}
		dispatch(loading())
		fetch("/register", request).then(response => {
			if (response.ok) {
				alert("Register success!")
				dispatch(registerSuccess());
			} else {
				if (response.status === 409) {
					dispatch(registerFailed("Username is already in use"));
				} else {
					dispatch(registerFailed("Server responded with status:" + response.status));
				}
			}
		}).catch(error => {
			dispatch(registerFailed("Server responded with an error:" + error));
		})
	}
}

export const login = (user) => {
	return dispatch => {
		let request = {
			method: "POST",
			mode: "cors",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(user)
		}
		dispatch(loading())
		fetch("/login", request).then(response => {
			if (response.ok) {
				alert("Login success!")
				response.json().then(data => {
					dispatch(loginSuccess(data.token));
					dispatch(getList(data.token));
				}).catch(error => {
					dispatch(loginFailed("Error parsing login information:" + error));
				})
			} else {
				if (response.status === 422 || response.status === 403) {
					dispatch(loginFailed("Username  or password is incorrect"));
				} else {
					dispatch(loginFailed("Server responded with a conflict. Try again later:" + response.statusText));
				}
			}
		}).catch(error => {
			dispatch(loginFailed("Server responded with an error:" + error));
		})
	}
}

export const logout = (token) => {
	return (dispatch) => {
		let request = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
				"token": token
			}
		}
		fetch("/logout", request).then(response => {
			dispatch(clearShoppingState())
			if (response.ok) {
				dispatch(logoutSuccess());

			} else {
				dispatch(logoutFailed("Server responded with a status " + response.status + ". Logging you out!"));;

			}
		}).catch(error => {
			dispatch(clearShoppingState())
			dispatch(logoutFailed("Server responded with error:" + error + "Logging you out!"));
		})
	}
}

//ACTION CREATORS

export const loading = () => {
	return {
		type: LOADING
	}
}

export const loadingDone = () => {
	return {
		type: LOADING_DONE
	}
}

export const registerSuccess = () => {
	return {
		type: REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type: REGISTER_FAILED,
		error: error
	}
}

export const loginSuccess = (token) => {
	return {
		type: LOGIN_SUCCESS,
		token: token
	}
}

export const loginFailed = (error) => {
	return {
		type: LOGIN_FAILED,
		error: error
	}
}

export const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type: LOGOUT_FAILED,
		error: error
	}
}

export const clearLoginState = () => {
	return {
		type: CLEAR_LOGIN_STATE
	}
}