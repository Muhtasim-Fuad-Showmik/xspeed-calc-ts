import React, { Component } from 'react';

class Result extends React.Component {
    state = {
        result: this.props.result,
        title: this.props.title,
    };

    hanldeIncrement = () => {
        this.setState({ result: this.state.result + 1 });
    }
    render() {
        return (<div className="result-card">
                    <div className="d-flex align-items-center">
                        <span className="math-result">= { this.state.result }</span>
                        <span className="calculation-title">{ this.state.title }</span>
                        <button onClick={this.hanldeIncrement} className="cstm-btn red">See Input</button>
                    </div>
                </div>);
    }
}
 
export default Result;