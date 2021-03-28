import React from 'react';
import ReactDOM from 'react-dom';
import './trackButton.css';

class trackButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: false,
            buttonText: "Start Tracking"
        };
        this.flipTracking = this.flipTracking.bind(this);
    }

    flipTracking() {
        this.setState({
            buttonText: this.state.tracking ? "Stop Tracking" : "Start Tracking",
            tracking: !this.state.tracking,
        });

    }

    render() {
        return (
            <button onClick={() => {
                this.flipTracking();
            }}>{this.state.buttonText}</button>
        );
    }
}

export default trackButton;