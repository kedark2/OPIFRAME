import React from 'react'
import { withRouter } from 'react-router-dom';

class About extends React.Component {
    render() {
        return (
            <div>
                <h1>This is about page</h1>
                <button onClick={() => this.props.history.push("/secret")}>Enter Secret Page</button>
            </div>
        )
    }
}
export default withRouter(About)