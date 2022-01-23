import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "./result.css";
import Modal from './modal';

class Result extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
    }

    openModal(){
        this.setState({
            isOpen: true
        });
    }

    closeModal(){
        this.setState({
            isOpen: false
        });
    }

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
        const { result, index, dragAndDrop } = this.props;

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
                                <button className="cstm-btn-red" onClick={() => this.openModal()}>See Input</button>
                                <Modal open={this.state.isOpen} onClose={() => this.closeModal()}>
                                    { result.inputContent }
                                </Modal>
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
                            <button className="cstm-btn-red" onClick={() => this.openModal()}>See Input</button>
                            <Modal open={this.state.isOpen} onClose={() => this.closeModal()}>
                                File Path: { result.inputContent }
                            </Modal>
                        </div>
                    </div>
                )
            }
            </React.Fragment>
        );
    }
}
 
export default Result;