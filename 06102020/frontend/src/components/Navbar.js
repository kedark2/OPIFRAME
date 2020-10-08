import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react'

export default class Navbar extends React.Component {

    render() {
        return (
            <div style={{ "backgroundColor": "lightblue", height: 80 }}>
                <List>
                    <List.Item><Link to="/">Shopping List</Link></List.Item>
                    <List.Item><Link to="/form">Add new item</Link></List.Item>
                </List>
            </div>

        )
    }

}