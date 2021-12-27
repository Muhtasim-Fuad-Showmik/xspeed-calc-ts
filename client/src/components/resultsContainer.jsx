import React, { Component } from 'react';
import TotalCounter from './totalCounter';
import Results from './results';
import './resultsContainer.css';

class ResultsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // REMOVABLE
    componentDidMount() {
        // Ajax Call to get data from the server
    }

    render() { 
        const { columns, onIncrement } = this.props;
        const column = columns['column-1'];
        const results = column.resultIds.map(resultId => this.props.results[resultId]);

        return(
            <div className={this.props.classType}>
                <TotalCounter totalResults={this.props.results.length} />
                <Results 
                results={results}
                column={column}
                dragAndDrop={this.props.dragAndDrop}
                onIncrement={onIncrement}
                />
            </div>
        );
    }
}
 
export default ResultsContainer;