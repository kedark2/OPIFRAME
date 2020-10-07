import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: 500
    }
  }
  componentDidMount() {
    this.getList();

  }

  getList = () => {
    let request = {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json" }
    }
    fetch("/api/shopping", request).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            list: data
          })
        }).catch(error => {
          console.log("Error parsing Json", error);
        });
      } else {
        console.log("Server responded with status: ", response.status);
      }
    }).catch(error => {
      console.log("Server responded with an error", error);
    });
  }
  /*
    addToList = (item) => {
      item.id = this.state.id;
      let tempList = this.state.list.concat(item);
      this.setState((state) => {
        return {
          list: tempList,
          id: state.id + 1
        }
      })
    }
  */
  addToList = (item) => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item)
    }
    fetch("/api/shopping", request).then(response => {
      if (response.ok) {
        this.getList();
      }
      else {
        console.log("Server responded with status:", response.status);
      }
    }).catch(error => {
      console.log("Server responded with an error:", error);
    });
  }
  /*
  removeFromList = (id) => {
    let tempList = this.state.list.filter(item => item.id !== id);
    this.setState({
      list: tempList
    });
  }
  */
  removeFromList = (id) => {
    let request = {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-type": "application/json" },
    }
    fetch("/api/shopping" + id, request).then(response => {
      if (response.ok) {
        this.getList();
      }
      else {
        console.log("Server responded with status", response.status);
      }
    }).catch(error => {
      console.log("Server responded with and error:", error);
    })
  }
  /*
  editItem = (newItem) => {
    let tempList = this.state.list.map(item => item.id === newItem.id ? newItem : item)
    this.setState({
      list: tempList
    });
  }
  */
  editItem = (newItem) => {
    let request = {
      method: "PUT",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newItem)
    }
    fetch("/api/shopping" + newItem.id, request).then(response => {
      if (response.ok) {
        this.getList();
      }
      else {
        console.log("Server responded with status", response.status);
      }
    }).catch(error => {
      console.log("Server responded with and error:", error);
    })
  }
  render() {
    return (
      <div className="App">
        <ShoppingForm addToList={this.addToList}></ShoppingForm>
        <hr />
        <ShoppingList list={this.state.list}
          removeFromList={this.removeFromList}
          editItem={this.editItem} />

      </div>
    );
  }
}

export default App;
