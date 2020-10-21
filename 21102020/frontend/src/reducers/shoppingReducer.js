import {
    FETCH_SHHOPPINGLIST_SUCCESS,
    FETCH_SHHOPPINGLIST_FAILED,
    ADD_TO_SHOPPINGLIST_SUCCESS,
    ADD_TO_SHOPPINGLIST_FAILED,
    REMOVE_FROM_SHOPPINGLIST_SUCCESS,
    REMOVE_FROM_SHOPPINGLIST_FAILED,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAILED,
    CLEAR_SHOPPING_STATE
} from '../actions/shoppingActions';

const getInitialState = () => {
    if (sessionStorage.getItem("shoppingstate")) {
        let state = JSON.parse(sessionStorage.getItem("shoppingstate"));
        return state;
    } else {
        return {
            error: "",
            list: []
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("shoppingstate", JSON.stringify(state));
}

const initialState = getInitialState();

const shoppingReducer = (state = initialState, action) => {
    console.log("Shoppingreducer:", action);
    let tempState = {};
    switch (action.type) {
        case FETCH_SHHOPPINGLIST_SUCCESS:
            tempState = {
                list: action.list,
                error: ""
            }
            saveToStorage(tempState);
            return (tempState);
        case FETCH_SHHOPPINGLIST_FAILED:
            tempState = {
                ...state,
                error: action.error
            }
            saveToStorage(tempState);
            return tempState
        case ADD_TO_SHOPPINGLIST_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(tempState);
            return tempState
        case ADD_TO_SHOPPINGLIST_FAILED:
            tempState = {
                ...state,
                error: action.error
            }
            saveToStorage(tempState);
            return tempState
        case REMOVE_FROM_SHOPPINGLIST_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(tempState);
            return tempState
        case REMOVE_FROM_SHOPPINGLIST_FAILED:
            tempState = {
                ...state,
                error: action.error
            }
            saveToStorage(tempState);
            return tempState

        case EDIT_ITEM_SUCCESS:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(tempState);
            return tempState
        case EDIT_ITEM_FAILED:
            tempState = {
                ...state,
                error: action.error
            }
            saveToStorage(tempState);
            return tempState
        case CLEAR_SHOPPING_STATE:
            tempState = {
                ...state,
                error: ""
            }
            saveToStorage(tempState);
            return tempState
        default:
            return state;
    }
}

export default shoppingReducer;