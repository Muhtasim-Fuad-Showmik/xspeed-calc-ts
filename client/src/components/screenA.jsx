import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { DragDropContext } from "react-beautiful-dnd";
import ResultsContainer from './resultsContainer';
import InputPanel from './inputPanel';

const ScreenA = (props) => { 
    const onFileChange = (files) => {
        // console.log(files);
    }
    
    const onDragEnd = async (output) => {
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
    
        //Generating new order of result ids based on the drag and drop location.
        const column = props.columns[source.droppableId];
        const newResultIds = Array.from(column.resultIds);
        let updatedResultIds;
        newResultIds.splice(source.index, 1);
        newResultIds.splice(destination.index, 0, draggableId);

        //Updating the states
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

        //Creating a query object using which the database can be updated according to the changes made.
        if(source.index < destination.index)
        {
            updatedResultIds = newResultIds.slice(source.index, destination.index + 1);
        }
        else
        {
            updatedResultIds = newResultIds.slice(destination.index, source.index + 1);
        }
        let updateQuery = [];
        updatedResultIds.forEach((item) => {
            let filter = `${item}`;
            let updatedIndex = newResultIds.indexOf(`${item}`);
            let update = {"index": updatedIndex};
            updateQuery.push({
                filter, update
            });
        });
        
        //Sending a post request to the express server to update the indices in the database.
        const res = await axios.post('/api/update-indices', updateQuery)
            .then(response => console.log("Updated indices"))
            .catch(err => {
              console.error(err);
            });
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