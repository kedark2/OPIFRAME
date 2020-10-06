import React from 'react'

export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: ""
        }
    }
    submit = (event) => {
        event.preventDefault();
        let name = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        // let name = this.state.firstname + " " + this.state.lastname;
        this.props.setMessage(name);
    }

    change = (event) => {
        let state = {};
        state[event.target.name] = event.target.value
        this.setState(state);
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <label htmlFor="Firstname">First Name:</label>
                <input type="text"
                    name="firstname"
                    onChange={this.change}
                    value={this.state.firstname}></input>
                <br />
                <label htmlFor="Lastname">Last Name:</label>
                <input type="text"
                    name="lastname"
                    onChange={this.change}
                    value={this.state.lastname}></input>
                <br />
                <input type="submit" value="Send message" />
            </form>
        )
    }
}