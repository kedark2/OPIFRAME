import { loading, loadingDone, clearLoginState } from './loginActions'

export const FETCH_SHHOPPINGLIST_SUCCESS = "FETCH_SHHOPPINGLIST_SUCCESS";
export const FETCH_SHHOPPINGLIST_FAILED = "FETCH_SHHOPPINGLIST_FAILED"
export const ADD_TO_SHOPPINGLIST_SUCCESS = "ADD_TO_SHOPPINGLIST_SUCCESS"
export const ADD_TO_SHOPPINGLIST_FAILED = "ADD_TO_SHOPPINGLIST_FAILED"
export const REMOVE_FROM_SHOPPINGLIST_SUCCESS = "REMOVE_FROM_SHOPPINGLIST_SUCCESS"
export const REMOVE_FROM_SHOPPINGLIST_FAILED = "REMOVE_FROM_SHOPPINGLIST_FAILED"
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS"
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED"
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE"


//ASYNC ACTIONS

export const getList = (token) => {
    return (dispatch) => {
        let request = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                "token": token
            }
        }
        dispatch(loading());
        fetch("/api/shopping", request).then(response => {
            dispatch(loadingDone());
            if (response.ok) {
                response.json().then(data => {
                    dispatch(fetchShoppinglistSuccess(data));
                }).catch(error => {
                    dispatch(fetchShoppinglistFailed("Error parsing shopping information"));
                });
            } else {
                if (response.status === 403) {
                    dispatch(fetchShoppinglistFailed("Server responded with expired session. Logging you out!"));
                    dispatch(clearLoginState());
                } else {
                    dispatch(fetchShoppinglistFailed("Server responded with status:" + response.status));
                }
            }
        }).catch(error => {
            dispatch(fetchShoppinglistFailed("Server responded with error:" + error));
        });
    }
}
export const addToList = (item, token) => {
    return (dispatch) => {
        let request = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                "token": token
            },
            body: JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/shopping", request).then(response => {
            if (response.ok) {
                dispatch(addToShoppinglistSuccess());
                dispatch(getList(token));
            }
            else {
                dispatch(loadingDone());
                if (response.status === 403) {
                    dispatch(addToShoppinglistFailed("Server responded with an expired session. Logging you out!"));
                    dispatch(clearLoginState());
                } else {
                    dispatch(addToShoppinglistFailed("Server responded with satus:" + response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(addToShoppinglistFailed("Server responded with an error:" + error));
        });
    }
}

export const removeFromList = (id, token) => {
    return (dispatch) => {
        let request = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                "token": token
            }
        }
        dispatch(loading())
        fetch("/api/shopping/" + id, request).then(response => {
            if (response.ok) {
                dispatch(removeFromShoppinglistSuccess());
                dispatch(getList(token));
            }
            else {
                dispatch(loadingDone());
                if (response.status === 403) {
                    dispatch(removeFromShoppinglistFailed("Server responded with an expired session. Logging you out!"));
                    dispatch(clearLoginState());
                } else {
                    dispatch(removeFromShoppinglistFailed("Server responded with status:" + response.statusText));
                }
            }
        }).catch(error => {
            dispatch(removeFromShoppinglistFailed("Server respondec with adn error;" + error));
        });
    }
}

export const editItem = (newItem, token) => {
    return (dispatch) => {
        let request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                "token": token
            },
            body: JSON.stringify(newItem)
        }
        fetch("/api/shopping/" + newItem._id, request).then(response => {
            if (response.ok) {
                dispatch(editItemSuccess());
                dispatch(getList(token));
            }
            else {
                dispatch(loadingDone());
                if (response.status === 403) {
                    dispatch(editItemFailed("Server respoded with an expired session. Logging you out!"));
                    dispatch(clearLoginState());
                } else {
                    dispatch(editItemFailed("Server respoded with an expired session. Logging you out!" + response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(editItemFailed("Server responded with an error!" + error))
        });
    }
}

//ACTION CREATORS

export const fetchShoppinglistSuccess = (list) => {
    return {
        type: FETCH_SHHOPPINGLIST_SUCCESS,
        list: list
    }
}

export const fetchShoppinglistFailed = (error) => {
    return {
        type: FETCH_SHHOPPINGLIST_FAILED,
        error: error
    }
}

export const addToShoppinglistSuccess = () => {
    return {
        type: ADD_TO_SHOPPINGLIST_SUCCESS
    }
}

export const addToShoppinglistFailed = (error) => {
    return {
        type: ADD_TO_SHOPPINGLIST_FAILED,
        error: error
    }
}
export const removeFromShoppinglistSuccess = () => {
    return {
        type: REMOVE_FROM_SHOPPINGLIST_SUCCESS
    }
}

export const removeFromShoppinglistFailed = (error) => {
    return {
        type: REMOVE_FROM_SHOPPINGLIST_FAILED,
        error: error
    }
}
export const editItemSuccess = () => {
    return {
        type: EDIT_ITEM_SUCCESS
    }
}

export const editItemFailed = (error) => {
    return {
        type: EDIT_ITEM_FAILED,
        error: error
    }
}
export const clearShoppingState = () => {
    return {
        type: CLEAR_SHOPPING_STATE
    }
}

