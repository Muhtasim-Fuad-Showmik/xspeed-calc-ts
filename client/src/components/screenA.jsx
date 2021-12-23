import { Link } from "react-router-dom";
import ResultsContainer from './resultsContainer';
import InputPanel from './inputPanel';
import React from "react";

const ScreenA = () => { 
    const onFileChange = (files) => {
        // console.log(files);
    }

    return (
        <React.Fragment>
            <div className="App">
                <main className="App-container">
                    <ResultsContainer classType="screen-a" />
                    <InputPanel 
                        onFileChange={(files) => onFileChange(files)}
                    />
                    <h4><Link to="/screenb">Screen B</Link></h4>
                </main>
            </div>
        </React.Fragment>
    );
}
 
export default ScreenA;