import React, { Component } from 'react';
import { Droppable} from "react-beautiful-dnd";
import Result from './result';
import "./results.css";

class Results extends Component {
    render() {
        const { column, results, dragAndDrop } = this.props;

        return (
            <div 
                className="result-panel responsive-width"
            >
            {
                dragAndDrop ?
                (
                    <Droppable droppableId={column.id}>
                    {(provided) => (
                        <div
                        ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                                {results.map((result, index) => (
                                    <Result 
                                        key={result.id}
                                        result={result} 
                                        index={index}
                                        dragAndDrop={dragAndDrop}
                                        selected
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                ) :
                (
                    <div>
                        {results.map((result, index) => (
                            <Result 
                                key={result.id}
                                result={result} 
                                index={index} 
                                selected
                            />
                        ))}
                    </div>
                )
            }
            </div>
        );
    }
}
 
export default Results;