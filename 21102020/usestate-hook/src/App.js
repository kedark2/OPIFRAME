import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './ShoppingForm'
import ShoppingList from './ShoppingList'

function App() {
  const [state, setState] = useState({
    list: [],
    id: 100
  })

  const addToList = (item) => {
    item.id = state.id;
    let tempList = state.list.concat(item);
    setState({
      list: tempList,
      id: state.id + 1
    })
  }

  const removeFromList = (id) => {
    let tempList = state.list.filter(item => item.id !== id)
    setState({
      ...state,
      list: tempList
    })
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
