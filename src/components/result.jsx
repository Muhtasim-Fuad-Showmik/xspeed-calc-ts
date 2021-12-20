import React, { Component } from 'react';

class Result extends React.Component {
    
    render() {
        return (<div className="result-card">
                    <div className="d-flex align-items-center">
                        <span className="math-result">= { this.props.result.result }</span>
                        <span className="calculation-title">{ this.props.result.title }</span>
                        <button className="cstm-btn red" onClick={() => this.props.onIncrement(this.props.result)}>See Input</button>
                    </div>
                </div>);
    }
}
 
export default Result;