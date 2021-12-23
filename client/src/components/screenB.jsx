import React from 'react';
import { Link } from "react-router-dom";
import ResultsContainer from './resultsContainer';
import InputPanel from './inputPanel';

const ScreenB = () => { 
    return (
        <React.Fragment>
            <div className="App">
                <main className="App-container">
                    <ResultsContainer classType="screen-b" />
                    <h4><Link to="/">Screen A</Link></h4>
                </main>
            </div>
        </React.Fragment>
    );
}
 
export default ScreenB;