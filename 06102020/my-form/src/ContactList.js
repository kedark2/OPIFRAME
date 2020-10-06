import React from 'react'

export default class ContactList extends React.Component {
    render() {
        let contacts = this.props.contacts.map((contact, index) => {
            return <li key={index}>{contact.firstname} {contact.lastname}</li>
        })
        return (
            <ul>
                {contacts}
            </ul>
        )
    }
}
