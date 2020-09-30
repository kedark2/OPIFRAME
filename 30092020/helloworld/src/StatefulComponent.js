import React from 'react';

export default class SatatefulComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            timerId: 0
        }
    }
    componentDidMount() {
        console.log("StatefulComponent- ComponentDidMount");
        let tempId = setInterval(this.startTimer, 1000);
        this.setState({
            timerId: tempId
        })
    }

    componentWillMount() {
        console.log("StatefulComponent- ComponentWillMount");
        clearInterval(this.state.timerId);
    }
    startTimer = () => {
        let tempseconds = this.state.seconds;
        tempseconds++;
        this.setState({
            seconds: tempseconds
        })
    }
    render() {
        console.log("StatefulComponent - render");
        let count = this.state.seconds.toString();
        return (
            <h2>Seconds since page loaded:{count}</h2>
        )
    }
}