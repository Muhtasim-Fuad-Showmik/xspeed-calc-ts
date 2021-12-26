import React, { Component } from 'react';
import TotalCounter from './totalCounter';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Results from './results';
import './resultsContainer.css';
import initialData from "../seeds";

class ResultsContainer extends React.Component {
    state = initialData;

    constructor(props) {
        super(props);
    }

    // REMOVABLE
    componentDidMount() {
        // Ajax Call to get data from the server
    }

    handleIncrement = result => {
        const { results } = this.state;
        results[result.id].result++;
        this.setState( results );
    };

    render() { 
        const { columns } = this.state;
        const column = columns['column-1'];
        const results = column.resultIds.map(resultId => this.state.results[resultId]);

        return(
            <div className={this.props.classType}>
                <TotalCounter totalResults={this.state.results.length} />

                <Results 
                results={results}
                column={column}
                onIncrement={this.handleIncrement} 
                />

            </div>
        );
    }
}
 
export default ResultsContainer;