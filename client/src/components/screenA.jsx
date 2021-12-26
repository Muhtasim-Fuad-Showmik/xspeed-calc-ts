import { Link } from "react-router-dom";
import ResultsContainer from './resultsContainer';
import { DragDropContext } from "react-beautiful-dnd";
import InputPanel from './inputPanel';
import React from "react";

const onDragEnd = output => {
    //TO IMPLEMENT
}

const ScreenA = () => { 
    const onFileChange = (files) => {
        // console.log(files);
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <main className="App-container">
                    <ResultsContainer classType="screen-a" />
                    <InputPanel 
                        onFileChange={(files) => onFileChange(files)}
                    />
                    <h4><Link to="/screenb">Screen B</Link></h4>
                </main>
            </div>
        </DragDropContext>
    );
}
 
export default ScreenA;