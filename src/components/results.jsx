import React, { Component } from 'react';
import Result from './result';

class Results extends React.Component {
    state = {
        results: [
            { id: 1, result: 24, title: "Calculation Title" },
            { id: 2, result: 22.123, title: "Calc Title" },
            { id: 3, result: 23.34, title: "Calc Title 2" },
            { id: 4, result: 27.341, title: "Another Title" },
            { id: 5, result: 721.21, title: "Calc Ttl" },
            { id: 6, result: 29, title: "Exhausted Title" },
            { id: 7, result: 9, title: "Small Title" },
        ]
    }
    render() { 
        return (
        <div className="result-panel responsive-width">
            { this.state.results.map(result => <Result key={result.id} result={result.result} title={result.title} selected/>) }
        </div>
        );
    }
}
 
export default Results;