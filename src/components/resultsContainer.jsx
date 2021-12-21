import React, { Component } from 'react';
import TotalCounter from './totalCounter';
import Results from './results';

class ResultsContainer extends React.Component {
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

    constructor(props) {
        super(props);
    }

    // REMOVABLE
    componentDidMount() {
        // Ajax Call to get data from the server
        console.log('App - Mounted');
    }

    handleIncrement = result => {
      const results = [...this.state.results];
      const index = results.indexOf(result);
      results[index] = {...result};
      results[index].result++;
      console.log(this.state.results[index]);
      this.setState({ results });
    };

    render() { 
        return(
            <React.Fragment>
                <TotalCounter totalResults={this.state.results.length} />
                <Results 
                    results={this.state.results}
                    onIncrement={this.handleIncrement} 
                />
            </React.Fragment>
        );
    }
}
 
export default ResultsContainer;