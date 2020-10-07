import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default class Row extends React.Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>Test {this.props.item.type}</Table.Cell>
                <Table.Cell>{this.props.item.count}</Table.Cell>
                <Table.Cell>{this.props.item.price}</Table.Cell>
                <Table.Cell>
                    <Button color="blue"
                        onClick={() => this.props.changeToRemoveMode(this.props.item.id)}>
                        Remove</Button>
                </Table.Cell>
                <Table.Cell>
                    <Button color="green"
                        onClick={() => this.props.changToEditMode(this.props.item.id)}>
                        Edit</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}
