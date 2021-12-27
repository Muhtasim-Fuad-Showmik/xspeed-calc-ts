import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "./result.css";

class Result extends React.Component {
    // REMOVABLE
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.result.result !== this.props.result.result){
            // Ajax call and get new data from the server
        }
    }

    // REMOVABLE
    componentWillUnmount() {
        // console.log('Counter - Unmount');
    }

    render() {
        const { result, onIncrement, index, dragAndDrop } = this.props;

        return (
            <React.Fragment>
            {
                dragAndDrop ?
                (
                    <Draggable draggableId={result.id} index={index}>
                        {(provided, snapshot) => (
                        <div 
                            className={snapshot.isDragging ? "result-card dragging" : "result-card"}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="d-flex align-items-center">
                                <span className="math-result">= { result.result }</span>
                                <span className="calculation-title">{ result.title }</span>
                                <button className="cstm-btn-red" onClick={() => onIncrement(result)}>See Input</button>
                            </div>
                        </div>
                        )}
                    </Draggable>
                ) :
                (
                    <div className="result-card">
                        <div className="d-flex align-items-center">
                            <span className="math-result">= { result.result }</span>
                            <span className="calculation-title">{ result.title }</span>
                            <button className="cstm-btn-red" onClick={() => onIncrement(result)}>See Input</button>
                        </div>
                    </div>
                )
            }
            </React.Fragment>
        );
    }
}
 
export default Result;