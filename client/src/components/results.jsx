import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Result from './result';
import "./results.css";

class Results extends Component {
    render() {
        const { column, results, onIncrement } = this.props;
        return (
            <div 
                className="result-panel responsive-width"
            >
                {results.map((result) => (
                    <Result key={result.id} onIncrement={onIncrement} result={result} selected/>
                ))}
            </div>
        );
    }
}
 
export default Results;