import React from 'react';

export default class Label extends React.Component {
    render() {
        let labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 12,
            margin: 0,
        }
        return (
            <p style={labelStyle} onClick={() => this.props.onColorChange()}>
                {this.props.color}</p>
        )
    }
}