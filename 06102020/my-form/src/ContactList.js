import React from 'react'

export default class ContactList extends React.Component {
    render() {
        let contacts = this.props.contacts.map((contact, index) => {
            return <li key={index}>{contact.firstname} {contact.lastname}
                <button onClick={() => this.props.removeContact(contact.id)}>Remove</button>
            </li>
        })
        return (
            <ul>
                {contacts}
            </ul>
        )
    }
}
