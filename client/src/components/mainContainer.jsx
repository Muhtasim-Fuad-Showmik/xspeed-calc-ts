import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenA from './screenA';
import ScreenB from './screenB';
import initialData from "../seeds";

class MainContainer extends React.Component {
    state = initialData;

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);
    }

    handler(newState)
    {
        this.setState(newState);
    }

    handleIncrement = result => {
        const { results } = this.state;
        results[result.id].result++;
        this.setState( results );
    };

    render() { 
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<ScreenA results={this.state.results} columns={this.state.columns} handler={this.handler} onIncrement={this.handleIncrement} />} />
                    <Route exact path="/screenb" element={<ScreenB results={this.state.results} columns={this.state.columns} onIncrement={this.handleIncrement} />} />
                </Routes>
            </Router>
        );
    }
}
 
export default MainContainer;