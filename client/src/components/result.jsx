import React, { Component } from 'react';
import "./result.css";

class Result extends React.Component {
    // REMOVABLE
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.result.result !== this.props.result.result){
            // Ajax call and get new data from the server
        }
    }

    // REMOVABLE
    componentWillUnmount() {
        // console.log('Counter - Unmount');
    }

    render() {
        return (<div className="result-card">
                    <div className="d-flex align-items-center">
                        <span className="math-result">= { this.props.result.result }</span>
                        <span className="calculation-title">{ this.props.result.title }</span>
                        <button className="cstm-btn-red" onClick={() => this.props.onIncrement(this.props.result)}>See Input</button>
                    </div>
                </div>);
    }
}
 
export default Result;