import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLogged: false,
      token: ""
    }
  }
  clearState = () => {
    this.setState({
      list: [],
      isLogged: false,
      token: ""
    }, () => {
      this.saveToStorage();
    })
  }
  componentDidMount() {
    if (sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      this.setState(state, () => { this.getList() })

    }
  }
  saveToStorage = () => {
    sessionStorage.setItem("state", JSON.stringify(this.state));
  }
  //Login API
  register = (user) => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user)
    }
    fetch("/register", request).then(response => {
      if (response.ok) {
        alert("Register success!")
      } else {
        if (response.status === 409) {
          alert("username is already in use")
        } else {
          console.log("Server responded with status:", response.status);
        }
      }
    }).catch(error => console.log("Server responded with error:", error));
  }

  login = (user) => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        "token": this.token
      },
      body: JSON.stringify(user)
    }
    fetch("/login", request).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            isLogged: true,
            token: data.token
          }, () => {
            this.saveToStorage();
            this.getList();
          })
        }).catch(error => { console.log("Error parsing JSON:", error) })
      } else {
        if (response.status === 403) {
          this.clearState();
        }
        console.log("Server responded with status:", response.status);
      }

    }).catch(error => console.log("Server responded with error:", error));
  }

  logout = () => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        "token": this.state.token
      },
    }
    fetch("/logout", request).then(response => {
      response.json().then(data => {
        this.setState({
          isLogged: false,
          token: "",
          list: []
        }, () => {
          this.saveToStorage();
        })
      }).catch(error => console.log("Server responded with error:", error));
    })
  }

  getList = () => {
    let request = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        "token": this.state.token
      }
    }
    fetch("/api/shopping", request).then(response => {
      if (response.ok) {
        response.json().then((data) => {
          this.setState({
            list: data
          }, () => {
            this.saveToStorage();
          })
        }).catch(error => {
          console.log("Error parsing Json", error);
        });
      } else {
        if (response.status === 403) {
          this.clearState();
        }
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
      headers: {
        "Content-type": "application/json",
        "token": this.state.token
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
      headers: {
        "Content-type": "application/json",
        "token": this.state.token
      },
    }
    fetch("/api/shopping/" + id, request).then(response => {
      if (response.ok) {
        this.getList();
      }
      else {
        if (response.status === 403) {
          this.clearState();
        }
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
      headers: {
        "Content-type": "application/json",
        "token": this.state.token
      },
      body: JSON.stringify(newItem)
    }
    fetch("/api/shopping/" + newItem.id, request).then(response => {
      if (response.ok) {
        this.getList();
      }
      else {
        if (response.status === 403) {
          this.clearState();
        }
        console.log("Server responded with status", response.status);
      }
    }).catch(error => {
      console.log("Server responded with and error:", error);
    })
  }
  render() {
    return (
      <div className="App" >
        <Navbar isLogged={this.state.isLogged} logout={this.logout} />
        <hr />
        <Switch>
          <Route exact path="/" render={() =>
            this.state.isLogged ?
              (<Redirect to="/list" />) :
              (<LoginPage
                register={this.register} login={this.login} />)
          } />
          <Route path="/list"
            render={() => this.state.isLogged ?
              <ShoppingList
                list={this.state.list}
                removeFromList={this.removeFromList}
                editItem={this.editItem} />
              :
              (<Redirect to="/" />)
            } />
          <Route path="/form"
            render={() => this.state.isLogged ?
              <ShoppingForm
                addToList={this.addToList} />
              :
              (<Redirect to="/" />)
            } />
        </Switch>


      </div>
    );
  }
}

export default App;
