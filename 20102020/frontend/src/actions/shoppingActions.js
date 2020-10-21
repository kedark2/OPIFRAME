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
                    dispatch(fetchShoppinglistSuccess(data))
                }).catch(error => {
                    dispatch(fetchShoppinglistFailed("Error parsing shopping information"));
                });
            } else {
                if (response.status === 403) {
                    dispatch(fetchShoppinglistFailed("Server responded with expired session. logging your out"));
                    dispatch(clearLoginState())
                } else {
                    dispatch(fetchShoppinglistFailed("Server responded with status:" + response.status));
                }
            }
        }).catch(error => {
            dispatch(fetchShoppinglistFailed("Server responded with error:" + error));
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
        type: ADD_TO_SHOPPINGLIST_SUCCESS,
    }
}

export const addToShoppinglistFailed = (error) => {
    return {
        type: addToShoppinglistFailed,
        error: error
    }
}
export const removeFromShoppinglistSuccess = () => {
    return {
        type: REMOVE_FROM_SHOPPINGLIST_SUCCESS,
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
        type: EDIT_ITEM_SUCCESS,
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
        type: CLEAR_SHOPPING_STATE,
    }
}

