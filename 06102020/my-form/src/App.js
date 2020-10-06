import React from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';
import ContactList from './ContactList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: 100,
      message: ""
    }
  }
  addContact = (contact) => {
    contact.id = this.state.id;
    let tempId = this.state.id + 1;
    let tempList = this.state.contacts.concat(contact);
    this.setState({
      contacts: tempList,
      id: tempId
    })
  }

  removeContact = (id) => {
    let tempId = parseInt(id, 10);
    let tempList = this.state.contacts.filter(contact => contact.id !== tempId);
    this.setState({
      contacts: tempList
    })
  }
  setMessage = (name) => {
    this.setState({
      message: "Hello " + name

    })
  }
  render() {
    return (
      <div className="App">
        {/* <NameForm setMessage={this.setMessage}></NameForm>
        <h3>{this.state.message}</h3>       */}
        <NameForm setMessage={this.addContact}></NameForm>
        <ContactList contacts={this.state.contacts} removeContact={this.removeContact}></ContactList>

      </div>
    );
  }

}

export default App;
