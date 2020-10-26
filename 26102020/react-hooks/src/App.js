import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, initialState } from 'react'
import ShoppingForm from './ShoppingList'
import ShoppingList from './ShoppingForm'

const useReducer = (state, action) => {
  let tempList = [];
  switch (action.type) {
    case "ADD_TO_LIST":
      action.item.id = state.id;
      tempList = state.list.concat(action.item);
      let id = state.id + 1;
      return {
        list: tempList,
        id: id
      }
    case "REMOVE_FROM_LIST":
      let tempId = parseInt(action.id, 10);
      tempList = state.list.filter(item => item.id !== tempId)
      return {
        ...state,
        list: tempList
      }
    default:
      return state;
  }
}
const listReducer = (state, action) => {
  let tempState = {};
  switch (action.type) {
    case "LOADING":
      tempState = {
        ...state,
        error: "",
        loading: true
      }
    case "LIST_LOADED":
      tempState = {
        list: action.list,
        loading: false,
        error: ""
      }
      return tempState;
    case "FETCH_FAILED":
      tempState = {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;

  }
}


function App() {

  const [state, dispatch] = useReducer(listReducer, initialState);

  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {}
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(urlRequest.url, urlRequest.request);
        if (response.ok) {
          if (urlRequest.request.method === "GET") {
            const data = await response.json();
            dispatch({ type: "LIST_LOADED", list: data })
          } else {
            getList();
          }
        } else {
          dispatch({
            type: "FETCH_FAILED",
            error: "Server responded with status:" + response.statusText
          })
        }
      } catch (error) {
        dispatch({
          type: "FETCH_FAILED",
          error: "Server responded with an error:" + error
        })
      }
    }
    fetchData();
  }, [urlRequest]);

  useEffect(() => getList(), [])

  const getList = () => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json" }
      }
    })
  }

  const addToList = (item) => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(item)
      }
    })
  }
  const removeFromList = (id) => {
    setUrlRequest({
      url: "/api/shopping" + id,
      request: {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-type": "application/json" }
      }
    })
  }
  let header = <h2>Shopping App</h2>
  if (state.loading) {
    header = <h2>Loading...</h2>

  }
  if (state.error) {
    header = <h2>{state.error}</h2>
  }
  return (
    <div className="App">
      <ShoppingForm addToList={addToList} />
      <hr />
      <ShoppingList list={state.list} removeFromList={removeFromList} />
    </div>
  );
}

export default App;
