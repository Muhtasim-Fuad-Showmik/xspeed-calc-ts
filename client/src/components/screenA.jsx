import { Link } from "react-router-dom";
import ResultsContainer from './resultsContainer';
import { DragDropContext } from "react-beautiful-dnd";
import InputPanel from './inputPanel';
import React from "react";

const ScreenA = (props) => { 
    const onFileChange = (files) => {
        // console.log(files);
    }
    
    const onDragEnd = output => {
        //TO IMPLEMENT
        const { destination, source, draggableId } = output;
    
        if(!destination){
            return;
        }
    
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
    
        const column = props.columns[source.droppableId];
        const newResultIds = Array.from(column.resultIds);
        newResultIds.splice(source.index, 1);
        newResultIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            resultIds: newResultIds,
        };

        const newState = {
            results: {
                ...props.results,
            },
             
            columns: {
                ...props.columns,
                [newColumn.id]: newColumn
            },
        };

        props.handler(newState);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <main className="App-container">
                    <ResultsContainer 
                        classType="screen-a"
                        results={props.results}
                        columns={props.columns}
                        dragAndDrop={true}
                        onIncrement={props.onIncrement}
                    />
                    <InputPanel
                        handler={props.handler} 
                        onFileChange={(files) => onFileChange(files)}
                    />
                    <h4><Link to="/screenb">Screen B</Link></h4>
                </main>
            </div>
        </DragDropContext>
    );
}
 
export default ScreenA;