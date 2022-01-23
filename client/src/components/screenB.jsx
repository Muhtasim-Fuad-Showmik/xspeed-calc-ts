import React from 'react';
import { Link } from "react-router-dom";
import ResultsContainer from './resultsContainer';

const ScreenB = (props) => { 
    return (
        <React.Fragment>
            <div className="App">
                <main className="App-container">
                    <ResultsContainer 
                        classType="screen-b"
                        results={props.results}
                        columns={props.columns}
                        dragAndDrop={false}
                    />
                    <h4><Link to="/">Screen A</Link></h4>
                </main>
            </div>
        </React.Fragment>
    );
}
 
export default ScreenB;