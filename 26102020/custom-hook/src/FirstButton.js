import React from 'react';

class FirstButton extends React.Component {
    callback = (event) => {
        this.props.callback("You pressed the first button");
    }

    render() {
        let buttonStyle = {
            backgroundColor = this.props.color
        }
        return (
            <button style={buttonStyle} onClick={this.callback}>Click me!</button>
        )
    }
}

export default FirstButton;