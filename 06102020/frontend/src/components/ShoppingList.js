import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import Row from './Row'
import RemoveRow from './RemoveRow'

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeIndex: -1
        }
    }

    cancel = () => {
        this.setState({
            removeIndex: -1
        })
    }
    changeToRemoveMode = (id) => {
        for (let i = 0; i < this.props.list.length; i++) {
            if (id === this.props.list[i].id) {
                this.setState({
                    removeIndex: i
                })
            }
        }
    }

    render() {
        let items = this.props.list.map((item, index) => {
            if (this.state.removeIndex === index) {
                return (
                    <RemoveRow key={item.id}
                        item={item} cancel={this.cancel}
                        removeFromList={this.props.removeFromList} />
                )
            }
            return (
                <Row key={item.id} item={item} changeToRemoveMode={this.changeToRemoveMode}></Row>

                // <Table.Row key={item.id}>
                //     <Table.Cell>{item.type}</Table.Cell>
                //     <Table.Cell>{item.count}</Table.Cell>
                //     <Table.Cell>{item.price}</Table.Cell>
                // </Table.Row>
            )
        })
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items}
                </Table.Body>
            </Table>
        )
    }
}